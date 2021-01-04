import moment from 'moment-timezone'

const isEmpty = (obj) => Object.keys(obj).length === 0

function sortTransactionsByDate(transactionList, orderBy = 'asc') {
    return transactionList.sort((a, b) => {
        const aDate = moment(a.date)
        const bDate = moment(b.date)
        if (aDate.isBefore(bDate)) return orderBy === 'asc' ? -1 : 1
        if (aDate.isAfter(bDate)) return orderBy === 'asc' ? 1 : -1
        return a.type === 'b' ? -1 : 1
    })
}

const BUY = 'b'
const SOLD = 's'

/**
 *
 * @param {*} list list of buy transactions
 */
export function calculateBuyAverages(list) {
    let costOfTrade = 0
    let totalUnits = 0
    for (let k = 0; k < list.length; k += 1) {
        costOfTrade += list[k].price * list[k].units
        totalUnits += list[k].units
    }
    return {
        average: parseFloat((costOfTrade / totalUnits).toFixed(3)),
        outstandingUnits: totalUnits,
    }
}

/**
 * Create an object with assests and a list of trades for each asset
 * @param {*} tradeList // List of available trades
 *
 * @return {Map} keys: asset tickers, value: [] list of trades for the ticker
 */
export function seperateTradesByCode(tradeList) {
    const tickers = new Map()
    for (let k = 0; k < tradeList.length; k += 1) {
        const { code } = tradeList[k]
        if (!tickers.has(code)) {
            tickers.set(code, [])
        }
        tickers.set(code, [...tickers.get(code), tradeList[k]])
    }
    return tickers
}

/**
 *
 * @param {*} list list of transactions
 * @param {*} sellTrade
 */
export function calculateSellAverages(list, sellTrade) {
    let costOfTrade = 0
    let totalUnits = 0
    for (let k = 0; k < list.length; k += 1) {
        costOfTrade += list[k].price * list[k].units
        totalUnits += list[k].units
    }

    return {
        average: parseFloat((costOfTrade / totalUnits).toFixed(3)),
        outstandingUnits: totalUnits - sellTrade.units,
    }
}

function profitAndLossBeforeFees(buyPrice, sellPrice, sellUnits) {
    return parseFloat((sellPrice * sellUnits - buyPrice * sellUnits).toFixed(3))
}

const averagePriceForEachTransaction = (tradelist) => {
    let tempBuyList = []
    let result = []
    for (let k = 0; k < tradelist.length; k += 1) {
        const trade = tradelist[k]

        if (trade.type === BUY) {
            tempBuyList.push(trade)
            const { average, outstandingUnits } = calculateBuyAverages(
                tempBuyList
            )
            result = [
                ...result,
                {
                    ...trade,
                    average,
                    outstandingUnits,
                    profitAndLossBeforeFees: 0,
                },
            ]
        }
        if (trade.type === SOLD) {
            if (tempBuyList.length < 1) {
                throw Error(
                    'There is a sell without any outstanding shares! Maybe the tradelist is not sorted ascending by date'
                )
            }
            const { average, outstandingUnits } = calculateSellAverages(
                tempBuyList,
                trade
            )
            // after each sell we reset the list to only include the latest average buy price
            tempBuyList = [
                {
                    price: average,
                    units: outstandingUnits,
                },
            ]
            const pAndL = profitAndLossBeforeFees(
                average,
                trade.price,
                trade.units
            )
            result = [
                ...result,
                {
                    ...trade,
                    average,
                    outstandingUnits,
                    profitAndLossBeforeFees: pAndL,
                },
            ]
        }
    }

    return result
}

function extractTags(transactions, match = '') {
    const tagsMeta = new Map()
    if (transactions.length > 0) {
        const taglist = [
            ...new Set(
                transactions.map((item) => {
                    const itemCategory = item.category || 'unknown'

                    if (tagsMeta.has(itemCategory)) {
                        const meta = tagsMeta.get(itemCategory)
                        tagsMeta.set(itemCategory, {
                            count: meta.count + 1,
                            selected: itemCategory.includes(match),
                        })
                    } else {
                        tagsMeta.set(itemCategory, {
                            count: 1,
                            selected: itemCategory.includes(match),
                        })
                    }
                    return itemCategory
                })
            ),
        ].sort((a, b) => {
            if (tagsMeta.get(a).count > tagsMeta.get(b).count) return -1
            if (tagsMeta.get(b).count > tagsMeta.get(a).count) return 1
            return 0
        })

        return { taglist, tagsMeta }
    }
    return { taglist: [], tagsMeta }
}

export {
    isEmpty,
    sortTransactionsByDate,
    averagePriceForEachTransaction,
    extractTags,
}
