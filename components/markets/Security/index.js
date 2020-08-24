import React from 'react'
import Summary from './Summary'
import Table from './Table'

import { buySummary, sellSummary } from '../forms/_utils'

import SecurityContext from './Context'

export default function Security(props) {
    const buy = buySummary(props.trades)
    const sell = sellSummary(props.trades)

    const { fees, profitAndLossBeforeFees } = props.trades.reduce(
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
    const { trades } = props
    if (trades.length < 1) {
        return ''
    }
    const value = {
        totalFees,
        totalPandLBeforeFees,
        trades,
        sell,
        buy,
        ticker: props.ticker,
    }
    return (
        <SecurityContext.Provider value={value}>
            <h2>{props.ticker.toUpperCase()}</h2>
            <Summary trades={props.trades} />
            <Table trades={props.trades} />
        </SecurityContext.Provider>
    )
}
