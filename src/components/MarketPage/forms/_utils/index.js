import moment from 'moment-timezone'

const sanatiseDollarSign = (arg) => {
    let sanitizedArg = arg
    if (typeof arg === 'string') {
        sanitizedArg = arg.replace('$', '')
        sanitizedArg = parseFloat(parseFloat(sanitizedArg).toFixed(3))
    }

    return sanitizedArg
}
/* eslint-disable no-prototype-builtins */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export function transactionExists(
    newTransaction,
    existingTransactions,
    units,
    price,
    fees
) {
    return existingTransactions.find((trade) => {
        return (
            newTransaction.code === trade.code &&
            newTransaction.date === trade.date &&
            units === trade.units &&
            price === trade.price &&
            fees === trade.fees
        )
    })
}

/**
 * Used only for the offline mode
 * @param {*} trades
 */
export function seperateTradesBySecurity(trades) {
    const tradesMap = new Map()
    trades.map((trade) => {
        if (!tradesMap.has(trade.code)) {
            tradesMap.set(trade.code, [])
        }
        const tradeArray = tradesMap.get(trade.code)
        tradeArray.push({ ...trade, ticker: trade.code })
        return tradesMap.set(trade.code, tradeArray)
    })
    return tradesMap
}

const BUY = 'b'
const SOLD = 's'

/**
 *
 * @param {*} list
 */
export function getAverageAndOutstandingNumber(list) {
    return list.reduce(
        (acc, item) => {
            const { units, price } = item
            const sanitizedPrice = sanatiseDollarSign(price)
            const sanitizedUnits = parseFloat(units)

            const costSum = acc.costSum + sanitizedUnits * sanitizedPrice
            const numberSum = acc.numberSum + sanitizedUnits
            let averagePrice
            if (!numberSum) {
                averagePrice = sanitizedPrice
            } else if (item.units < 0) {
                // indicate a sell. Average does not change with a sell
                averagePrice = acc.averagePrice
            } else {
                averagePrice = costSum / numberSum
            }
            return {
                costSum,
                numberSum,
                averagePrice,
            }
        },
        { costSum: 0, numberSum: 0, averagePrice: 0 }
    )
}

/**
 * Check if the transaction has all the required keys with truthy values
 *
 * @param {*} transaction
 * @returns bool
 */
export function validateTransactionData(transaction) {
    const requiredKeys = [
        'orderNumber',
        'date',
        'type',
        'code',
        'units',
        'price',
        'fees',
    ]

    for (const key in requiredKeys) {
        const targetKey = requiredKeys[key]
        if (
            !transaction.hasOwnProperty(targetKey) ||
            transaction[targetKey] == null ||
            transaction[targetKey] === ''
        )
            throw Error(
                `Validation failed. The key: "${targetKey}" does not exists or has no value`
            )
    }

    return true
}

/**
 *
 * @param {*} transaction
 * @returns Object { type: string, code: string, units: int, price: float, fees: float, date: Moment}
 */
export function cleanseTransactionData(transaction) {
    try {
        const { date, type, code, units, price, fees } = transaction
        if (!units) {
            throw Error('Number of units are not defined for this transaction')
        }

        return {
            type: type.toLowerCase(),
            code: code.toLowerCase(),
            units: parseInt(
                typeof units === 'string' ? units.replace(',', '') : units,
                10
            ),
            price: parseFloat(
                typeof price === 'string' ? price.replace('$', '') : price
            ),
            fees: parseFloat(
                typeof fees === 'string' ? fees.replace('$', '') : fees
            ),
            date: moment(date, 'DD/MM/YYYY', true).tz('Australia/Melbourne'),
        }
    } catch (err) {
        throw Error(`Failed to cleanse the transaction data ${err}`)
    }
}

export function validateUploadedJSON(uploadedJSON, existingTransactions) {
    return uploadedJSON.reduce(
        (accumulator, current) => {
            if (!validateTransactionData(current)) return []
            const cleansedTransactions = cleanseTransactionData(current)

            if (transactionExists(cleansedTransactions, existingTransactions))
                accumulator.rejected.push(current)
            else accumulator.accepted.push(cleansedTransactions)

            return accumulator
        },
        { accepted: [], rejected: [] }
    )
}

export function addAveragePriceAfterEachSell(tradeList) {
    let buyUntilSold = []
    // TODO : Assuming the order of tradelist is desc by timestamp
    const temp = [...tradeList]
    return temp.reverse().map((trade) => {
        const { price, units, fees } = trade

        const sanitizedPrice = sanatiseDollarSign(price)
        const sanitizedFees = sanatiseDollarSign(fees)
        const sanitizedUnits = parseInt(units, 10)

        if (trade.type.toLowerCase() === BUY) {
            buyUntilSold.push({ units, price })
            const {
                costSum,
                numberSum,
                averagePrice,
            } = getAverageAndOutstandingNumber(buyUntilSold)
            return {
                ...trade,
                price: sanitizedPrice,
                units: sanitizedUnits,
                fees: sanitizedFees,
                averagePrice,
                outstandingNumberOfSecurity: numberSum,
                costSum,
            }
        }
        if (trade.type.toLowerCase() === SOLD) {
            buyUntilSold.push({ units: -1 * units, price })
            const {
                costSum,
                numberSum,
                averagePrice,
            } = getAverageAndOutstandingNumber(buyUntilSold)
            buyUntilSold = [{ units: numberSum, price: averagePrice }]
            return {
                ...trade,
                price: sanitizedPrice,
                units: sanitizedUnits,
                fees: sanitizedFees,
                averagePrice,
                outstandingNumberOfSecurity: numberSum,
                costSum,
                profitAndLossBeforeFees:
                    sanitizedUnits * (sanitizedPrice - averagePrice),
            }
        }
        return ''
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
        totalSellFees: 0,
        averagePrice: 0,
        outstandingNumberOfsecurity: 0,
    }

    return tradeList.reduce((acc, trade) => {
        const { price, units, fees, type } = trade
        if (!price || !units || !fees || !type) {
            throw Error(
                'A required field for one of the transactions is not available. Required fields are price, units, type and fees'
            )
        }
        const sanitizedPrice = sanatiseDollarSign(price)
        const sanitizedFees = sanatiseDollarSign(fees)
        const sanitizedUnits = parseInt(units, 10)
        const tradeCost = sanitizedPrice * sanitizedUnits

        if (type.toLowerCase() === BUY) {
            return {
                ...acc,
                totalBuyCost: acc.totalBuyCost
                    ? acc.totalBuyCost + tradeCost
                    : tradeCost,
                totalNumberBuy: acc.totalNumberBuy
                    ? acc.totalNumberBuy + sanitizedUnits
                    : sanitizedUnits,
                totalBuyFees: acc.totalBuyFees
                    ? acc.totalBuyFees + sanitizedFees
                    : sanitizedFees,
            }
        }
        if (type.toLowerCase() === SOLD) {
            return {
                ...acc,
                totalSellCost: acc.totalSellCost
                    ? acc.totalSellCost + tradeCost
                    : tradeCost,
                totalNumberSell: acc.totalNumberSell
                    ? acc.totalNumberSell + sanitizedUnits
                    : sanitizedUnits,
                totalSellFees: acc.totalSellFees
                    ? acc.totalSellFees + sanitizedFees
                    : sanitizedFees,
                averagePrice: trade.averagePrice || 0,
                outstandingNumberOfsecurity:
                    trade.outstandingNumberOfsecurity || 0,
            }
        }
        return {}
    }, initialValue)
}

export function getTradeSummary(trades) {
    return trades.reduce((result, trade) => {
        const { price } = trade
        const { units } = trade
        const { fees } = trade
        let res = result
        if (!result[trade.code]) res = { ...res, [trade.code]: {} }
        const tradeCost = price * units
        const temp = result[trade.code]

        if (trade.type.toLowerCase() === 'b') {
            res = {
                ...res,
                [trade.code]: {
                    ...temp,
                    totalBuyCost: temp.totalBuyCost
                        ? temp.totalBuyCost + tradeCost
                        : tradeCost,
                    totalNumberBuy: temp.totalNumberBuy
                        ? temp.totalNumberBuy + units
                        : units,
                    totalBuyFees: temp.totalBuyFees
                        ? temp.totalBuyFees + fees
                        : fees,
                },
            }
        } else if (trade.type.toLowerCase() === 's') {
            res = {
                ...res,
                [trade.code]: {
                    ...temp,
                    totalSellCost: temp.totalSellCost
                        ? temp.totalSellCost + tradeCost
                        : tradeCost,
                    totalNumberSell: temp.totalNumberSell
                        ? temp.totalNumberSell + units
                        : units,
                    totalSellFees: temp.totalSellFees
                        ? temp.totalSellFees + fees
                        : fees,
                },
            }
        }

        return res
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
    for (let k = 0; k < tradeList.length; k += 1) {
        const date = tradeList[k].date.toString()
        if (!tickers.has(date)) {
            tickers.set(date, [])
        }
        tickers.set(date, [...tickers.get(date), tradeList[k]])
    }
    return tickers
}

/**
 * Sum the cost, fees and units for all the buys
 *
 * @param {*} tradeList
 * @returns number
 */
export function buySummary(tradeList) {
    const temp = tradeList.reduce(
        (acc, current) => {
            if (current.type === BUY) {
                acc.cost += current.price * current.units
                acc.fees += current.fees
                acc.units += current.units
            }
            return acc
        },
        { cost: 0, fees: 0, units: 0 }
    )
    return {
        cost: parseFloat(temp.cost.toFixed(3)),
        units: temp.units,
        fees: parseFloat(temp.fees.toFixed(3)),
    }
}

/**
 * Sum the cost, fees and units for all the sells
 *
 * @param {*} tradeList
 * @returns number
 */
export function sellSummary(tradeList) {
    const temp = tradeList.reduce(
        (acc, current) => {
            if (current.type === SOLD) {
                acc.cost += current.price * current.units
                acc.fees += current.fees
                acc.units += current.units
            }
            return acc
        },
        { cost: 0, fees: 0, units: 0 }
    )

    return {
        cost: parseFloat(temp.cost.toFixed(3)),
        units: temp.units,
        fees: parseFloat(temp.fees.toFixed(3)),
    }
}
