
import {
    getLastDBPrice,
    addTransaction
} from '../../api'

export function transactionExists(newTransaction, existingTransactions) {
    return existingTransactions.find(trade => {
        return newTransaction.code === trade.code 
            && newTransaction.date === trade.date
            && units === trade.units
            && price === trade.price
            && fees === trade.fees
        })

}

export function validateUploadedJSON(uploadedJSON, existingTransactions) {
    return uploadedJSON.reduce((accumulator, current)  => {
        if(!validateTransactionData(current)) return []
        const cleansedTransactions = cleanseTransactionData(current) 

        if(transactionExists(cleansedTransactions, existingTransactions)) 
            accumulator.rejected.push(current)
        else 
            accumulator.accepted.push(cleansedTransactions)
        
        return accumulator
    }, { accepted: [], rejected: [] })
}
  
function convertToFloat(value) {
    return typeof value === 'string' ? parseFloat(value.replace(",", "")) : parseFloat(value)
}
/**
 * Used only for the offline mode only
 * @param {*} trades 
 */
export function seperateTradesBySecurity(trades) {
    let tradesMap = new Map()
    trades.map(trade => {
        if(!tradesMap.has(trade.code)) {
            tradesMap.set(trade.code, [])
        }
        const tradeArray = tradesMap.get(trade.code)        
        tradeArray.push({ ...trade, ticker: trade.code })
        return tradesMap.set(trade.code, tradeArray)
    })
    console.log('tradesMap is ', tradesMap)
    return tradesMap
}

const BUY = 'b'
const SOLD = 's'

/**
 * 
 * @param {*} list 
 */
export function getAverageAndOutstandingNumber(list) {
    return list.reduce((acc, item) => {
       const costSum =  acc.costSum + item.units * item.price
       const numberSum = acc.numberSum + item.units
       let averagePrice
       if(!numberSum) {
            averagePrice = item.price
       } else if(item.units < 0) { // indicate a sell. Average does not change with a sell
            averagePrice = acc.averagePrice
       } else {
            averagePrice = costSum / numberSum 
       }
       return { 
            costSum,
            numberSum,
            averagePrice
        }
    }, { costSum: 0, numberSum: 0, averagePrice: 0 })
}

export function addAveragePriceAfterEachSell(tradeList) {
    let buyUntilSold = []
    let averagePrice, outstandingNumberOfSecurity;
    // TODO : Assuming the order of tradelist is desc by timestamp
    const temp = [...tradeList]
    return temp.reverse().map(trade => {
        const { price, units, fees } = trade;

        if( trade.type.toLowerCase() === BUY) {
            buyUntilSold.push({ units, price }) 
            const { costSum, numberSum, averagePrice } = getAverageAndOutstandingNumber(buyUntilSold)
            return {
                ...trade, 
                price, 
                units, 
                fees,
                averagePrice,
                outstandingNumberOfSecurity: numberSum,
                costSum
            }
        } 
        else if(trade.type.toLowerCase() === SOLD) {
            buyUntilSold.push({ units: -1 * units, price }) 
            const { costSum, numberSum, averagePrice } = getAverageAndOutstandingNumber(buyUntilSold)
            buyUntilSold = [{ units: numberSum, price: averagePrice }]
            return {
                    ...trade, 
                    price, 
                    units, 
                    fees,
                    averagePrice,
                    outstandingNumberOfSecurity: numberSum,
                    costSum,
                    profitAndLossBeforeFees:  units * (price - averagePrice)
            }
        }       
    })
}
/**
 * 
 * 
 * @param {*} tradeList 
 * 
 * @return Object 
 *  {   totalBuyCost: number,
 *      totalNumberBuy: number,
 *      totalBuyFees: number,
 *      totalSellCost: number,
 *      totalNumberSell: number,
 *      totalBuyFees: number,
 *      totalSellFees: number,
 *      averagePrice: number,
 *      outstandingNumberOfsecurity: number
 *  }
 */
export function getSummaryForOneAsset(tradeList) {
    const initialValue = {
        totalBuyCost: 0,
        totalNumberBuy: 0,
        totalBuyFees: 0,
        totalSellCost: 0,
        totalNumberSell: 0,
        totalBuyFees: 0,
        totalSellFees: 0,
        averagePrice: 0,
        outstandingNumberOfsecurity: 0
    }

    return tradeList.reduce((acc, trade) => {
        const { price, units, fees } = trade;
            
        const tradeCost = price * units

        if(trade.type.toLowerCase() === BUY) {
            acc = { 
                ...acc,                   
                totalBuyCost: acc['totalBuyCost'] ? acc['totalBuyCost'] + tradeCost : tradeCost,  
                totalNumberBuy: acc['totalNumberBuy']  ? acc['totalNumberBuy'] + units : units,
                totalBuyFees: acc['totalBuyFees'] ? acc['totalBuyFees'] + fees : fees,
                
            } 

        } else if(trade.type.toLowerCase() === SOLD) {
            acc = {
                ...acc, 
                totalSellCost: acc['totalSellCost'] ? acc['totalSellCost'] + tradeCost : tradeCost,
                totalNumberSell: acc['totalNumberSell'] ? acc['totalNumberSell'] + units : units, 
                totalSellFees: acc['totalSellFees'] ? acc['totalSellFees'] + fees : fees,
                averagePrice: trade.averagePrice || 0,
                outstandingNumberOfsecurity: trade.outstandingNumberOfsecurity || 0
            }
        } 
        return acc
    }, initialValue)
}

export function getTradeSummary(trades) {
    return trades.reduce((result, trade) => {
        const price = trade.price
        const units = trade.units
        const fees = trade.fees
        
        if(!result[trade.code]) result = {...result, [trade.code]: {} }
        const tradeCost = price * units
        const temp = result[trade.code]

        if(trade.type.toLowerCase() === 'b') {

            result = {...result, 
                [trade.code] : { 
                ...temp,                   
                totalBuyCost: temp['totalBuyCost'] ? temp['totalBuyCost'] + tradeCost : tradeCost,  
                totalNumberBuy: temp['totalNumberBuy']  ? temp['totalNumberBuy'] + units : units,
                totalBuyFees: temp['totalBuyFees'] ? temp['totalBuyFees'] + fees : fees
                } 
            } 

        } else if(trade.type.toLowerCase() === 's') {

            result = {...result, 
                [trade.code] : { 
                ...temp, 
                totalSellCost: temp['totalSellCost'] ? temp['totalSellCost'] + tradeCost : tradeCost,
                totalNumberSell: temp['totalNumberSell'] ? temp['totalNumberSell'] + units : units, 
                totalSellFees: temp['totalSellFees'] ? temp['totalSellFees'] + fees : fees
                }
            } 

        } 

        return result
    }, {})
}

/**
 * Create an object with assests and a list of trades for each date
 * @param {*} tradeList // List of available trades
 * 
 * @return {Map} keys: asset tickers, value: [] list of trades for the ticker 
 */
export function seperateTradesByDate(tradeList) {
    const tickers = new Map()
    for(let k = 0; k < tradeList.length; k++) {
        const date = tradeList[k].date.toString()
        if(!tickers.has(date)) {
            tickers.set(date, [])
        }
        tickers.set(date, [...tickers.get(date), tradeList[k]])
    }
    return tickers
}   

/**
 * 
 * @param {*} transaction
 * @returns Object { type: string, code: string, units: int, price: float, fees: float, date: Moment} 
 */
export function cleanseTransactionData(transaction) {
    const moment = require('moment-timezone')
    try {
        const { date, type, code, units, price, fees } = transaction
        return {
            type: type.toLowerCase(),
            code: code.toLowerCase(),
            units: parseInt(typeof units === 'string' ? units.replace(',', '') : units, 10),
            price: parseFloat( typeof price === 'string' ? price.replace('$', '') : price),
            fees: parseFloat(typeof fees === 'string' ? fees.replace('$', '') : fees),
            date: moment(date, 'DD/MM/YYYY', true).tz('Australia/Melbourne')
        }
    } catch(err) {
        throw `Failed to cleanse the transaction data ${err}`
    }
}

/**
 * Check if the transaction has all the required keys with truthy values
 * 
 * @param {*} transaction 
 * @returns bool 
 */
export function validateTransactionData(transaction) {
    const requiredKeys = ['orderNumber', 'date', 'type', 'code', 'units', 'price', 'fees'] 

    for(const key in requiredKeys) {
        const targetKey = requiredKeys[key]
        if(!transaction.hasOwnProperty(targetKey) 
            || transaction[targetKey] == null
            || transaction[targetKey] === '') 

            throw `Validation failed. The key: "${targetKey}" does not exists or has no value`
    }

    return true
}


/**
 * Sum the cost, fees and units for all the buys
 * 
 * @param {*} tradeList 
 * @returns number 
 */
export function buySummary(tradeList) {
    
    const temp = tradeList.reduce((acc, current) => {
        if(current.type === BUY) {
            acc.cost += current.price * current.units
            acc.fees += current.fees
            acc.units += current.units
        }
        return acc
    }, { cost: 0, fees: 0, units: 0})
    return {
        cost: parseFloat(temp.cost.toFixed(3)),
        units: temp.units,
        fees:  parseFloat(temp.fees.toFixed(3)),
    }
}

/**
 * Sum the cost, fees and units for all the sells
 * 
 * @param {*} tradeList 
 * @returns number 
 */
export function sellSummary(tradeList) {
    const temp = tradeList.reduce((acc, current) => {
        if(current.type === SOLD) {
            acc.cost += current.price * current.units
            acc.fees += current.fees
            acc.units += current.units
        }
        return acc
    }, { cost: 0, fees: 0, units: 0})

    return {
        cost: parseFloat(temp.cost.toFixed(3)),
        units: temp.units,
        fees: parseFloat(temp.fees.toFixed(3))
    }
}

export async function getLastPriceForAcceptedTrades(trades) {
    const resultArr = trades.map(async (trade) => {
        const date = trade.date.format('DD/MM/YYYY')
        const { lastPrice } = await getLastDBPrice(date, trade.code)
        const  result = { ...trade, lastPrice }
        await addTransaction(result)
        return result 
    })
    const all =  await Promise.all(resultArr)
    return all
}

