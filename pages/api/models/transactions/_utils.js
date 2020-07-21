const moment = require('moment-timezone')

const BUY = 'b'
const SOLD = 's'

/**
 * Create an object with assests and a list of trades for each asset
 * @param {*} tradeList // List of available trades
 * 
 * @return {Map} keys: asset tickers, value: [] list of trades for the ticker 
 */
export function seperateTradesByTickers(tradeList) {
    const tickers = new Map()
    for(let k = 0; k < tradeList.length; k++) {
        const ticker = tradeList[k].ticker
        if(!tickers.has(ticker)) {
            tickers.set(ticker, [])
        }
        tickers.set(ticker, [...tickers.get(ticker), tradeList[k]])
    }
    return tickers
}   

export function sortTransactionsByDate(transactionList, orderBy='asc') { 
    return transactionList.sort((a, b) => {
        const aDate = moment(a.date)
        const bDate = moment(b.date)
        if(aDate.isBefore(bDate)) return  orderBy === 'asc' ? -1 : 1
        if(aDate.isAfter(bDate)) return orderBy === 'asc' ? 1 : -1
        return a.type === 'b' ? -1 : 1
    })
}

export const averagePriceForEachTransaction = tradelist => {
    let tempBuyList = []
    let result = []
    for(let k = 0; k < tradelist.length; k++) {
        const trade = tradelist[k]

        if(trade.type === BUY) {
            tempBuyList.push(trade)
            const { average, outstandingUnits } = calculateBuyAverages(tempBuyList)
            result = [...result, 
                {
                    ...trade, 
                    average, 
                    outstandingUnits, 
                    profitAndLossBeforeFees: 0
                }
            ]
        }
        if(trade.type === SOLD) {
            if(tempBuyList.length < 1) {
                throw Error('There is a sell without any outstanding shares! Maybe the tradelist is not sorted ascending by date')
            }
            const { average, outstandingUnits } = calculateSellAverages(tempBuyList, trade)
            // after each sell we reset the list to only include the latest average buy price 
            tempBuyList = [{ 
                price: average, 
                units: outstandingUnits 
            }]
            const pAndL = profitAndLossBeforeFees(average, trade.price, trade.units)
            result = [...result, 
                {
                    ...trade,
                    average, 
                    outstandingUnits, 
                    profitAndLossBeforeFees: pAndL
                }
            ]
        }
    }

    return result
}

/**
 * 
 * @param {*} list list of buy transactions
 */
export function calculateBuyAverages(list) {
    let costOfTrade = 0
    let totalUnits = 0
    for(let k = 0; k < list.length; k++) {
        costOfTrade += list[k].price * list[k].units 
        totalUnits += list[k].units
    } 
    return {
        average: parseFloat((costOfTrade / totalUnits).toFixed(3)),
        outstandingUnits: totalUnits
    }
}

/**
 * 
 * @param {*} list list of transactions
 * @param {*} sellTrade 
 */
export function calculateSellAverages(list, sellTrade) {
    let costOfTrade = 0
    let totalUnits = 0
    for(let k = 0; k < list.length; k++) {
        costOfTrade += list[k].price * list[k].units 
        totalUnits += list[k].units
    } 

    return {
        average: parseFloat((costOfTrade / totalUnits).toFixed(3)),
        outstandingUnits: totalUnits - sellTrade.units 
    }
}

function profitAndLossBeforeFees(buyPrice, sellPrice, sellUnits) {
    return ((sellPrice * sellUnits) - (buyPrice * sellUnits)).toFixed(3)
}

export const timestamp = (datetime, dateFormat='YYYY-MM-DDTHH:mm:ss', zone='AUSTRALIA/MELBOURNE') => {
    return moment(datetime.trim(), dateFormat).tz(zone).unix()
}