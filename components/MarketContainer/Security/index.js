import React from 'react'
import Summary from './Summary'
import Table from './Table'

import { buySummary, sellSummary } from '../forms/_utils'

import SecurityContext from './Context'

export default function Security(props) {
    const { trades, ticker } = props
    const buy = buySummary(trades)
    const sell = sellSummary(trades)

    const { fees, profitAndLossBeforeFees } = trades.reduce(
        (acc, cur) => ({
            fees: acc.fees + cur.fees,
            profitAndLossBeforeFees:
                acc.profitAndLossBeforeFees +
                parseFloat(cur.profitAndLossBeforeFees),
        }),
        { fees: 0, profitAndLossBeforeFees: 0 }
    )

    const totalFees = fees
    const totalPandLBeforeFees = profitAndLossBeforeFees

    if (trades.length < 1) {
        return ''
    }
    const value = {
        totalFees,
        totalPandLBeforeFees,
        trades,
        sell,
        buy,
        ticker,
    }
    return (
        <SecurityContext.Provider value={value}>
            <h2>{ticker.toUpperCase()}</h2>
            <Summary trades={trades} />
            <Table trades={trades} />
        </SecurityContext.Provider>
    )
}
