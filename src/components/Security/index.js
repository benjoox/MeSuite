import React, { useContext } from 'react' 
import Summary from './Summary'
import Table from './Table'

import { sortTransactionsByDate, 
    averagePriceForEachTransaction,
    buySummary,
    sellSummary 
} from '../Transaction/_utils'


import SecurityContext from './Context'

export default function Security(props) {
    const buy = buySummary(props.trades)
    const sell = sellSummary(props.trades)
    
    
    const sortedList = sortTransactionsByDate((props.trades))
    const listWithAvg = averagePriceForEachTransaction(sortedList)
    
    const { fees, profitAndLossBeforeFees } = listWithAvg.reduce((acc, cur) => ({
        fees: acc.fees + cur.fees,
        profitAndLossBeforeFees: acc.profitAndLossBeforeFees + parseFloat(cur.profitAndLossBeforeFees)
    }), { fees: 0, profitAndLossBeforeFees: 0 })

    const totalFees = fees
    const totalPandLBeforeFees = profitAndLossBeforeFees
    const trades = props.trades
    if(trades.length < 1) {
        return ''
    }
    const value = {
        listWithAvg,
        totalFees,
        totalPandLBeforeFees,
        trades,
        sell,
        buy
    }
    return (
        <SecurityContext.Provider value={value}>
            <h2>{props.trades[0].code.toUpperCase()}</h2>
            <Summary trades={props.trades}/>
            <Table trades={props.trades}/>
        </SecurityContext.Provider>
    )
}