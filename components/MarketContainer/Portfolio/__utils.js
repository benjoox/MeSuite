import fetch from 'isomorphic-fetch'
import { buySummary, sellSummary } from '../forms/_utils'

const FEES = 19.95

export const consolidate = (summary) =>
    summary.reduce(
        (acc, ticker) => ({
            totalBuy: acc.totalBuy ? acc.totalBuy + ticker.buy : ticker.buy,
            totalSell: acc.totalSell
                ? acc.totalSell + ticker.sell
                : ticker.sell,
        }),
        { totalBuy: 0, totalSell: 0 }
    )

export const consolidateOutstandings = (outstandingSecurities) =>
    outstandingSecurities.reduce((acc, ticker) => {
        const lastPrice = ticker.lastPrice ? parseFloat(ticker.lastPrice) : 0
        return acc
            ? acc + lastPrice * ticker.outstandingUnits - FEES
            : lastPrice * ticker.outstandingUnits - FEES
    }, 0)

export async function getLastPrice(ticker) {
    const response = await fetch(`/api/v1/quotes?ticker=${ticker}`)
    return response.json()
}

export async function getLastDBPrice(date) {
    const response = await fetch(`/api/v1/prices?date=${date}`)
    return response.json()
}

export const summaryList = (tradesMap) => {
    const result = []
    tradesMap.forEach((v) => {
        const value = v[1]
        const key = v[0]
        const buy = buySummary(value)
        const sell = sellSummary(value)

        result.push({
            ticker: key.toUpperCase(),
            buy: buy.cost + buy.fees,
            sell: sell.cost - sell.fees,
            outstandingUnits: buy.units - sell.units,
            cost: (sell.cost - buy.cost - buy.fees - sell.fees).toFixed(3),
        })
    })

    return result
}
