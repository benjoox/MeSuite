import React, { createContext } from 'react'
import { buySummary, sellSummary } from '../Transaction/_utils'
import { Table } from '../UIElements'

const ProtfolioContext = createContext('portfolio') 

export default function Portfolio(props) {

    const summaryList = () => {
        let result = []
        props.tradesMap.forEach((value, key) => {
            const buy = buySummary(value)
            const sell = sellSummary(value)
            result.push({ 
                code: key.toUpperCase(), 
                buy: buy.cost,
                sell: sell.cost,
                fees: (buy.fees + sell.fees).toFixed(3),
                outstandingUnits: (buy.units - sell.units),
                cost: (sell.cost - buy.cost - buy.fees - sell.fees).toFixed(3)
            })
        })
        return result
    }

    if(!props.tradesMap) return ''
    return  <div>
                <h2>Portfolio</h2>
                <Table list={summaryList()} column={column} />
            </div>
}

const column = [
    {
        Header: 'Code',
        accessor: 'code',
    },
    {
        Header: 'Buy',
        accessor: 'buy'
    },
    {
        Header: 'Sell',
        accessor: 'sell'
    },
    {
        Header: 'Fees',
        accessor: 'fees'
    },
    {
        Header: 'Available # of assets',
        accessor: 'outstandingUnits'
    },
    {
        Header: 'Total cost (inc. fees)',
        accessor: 'cost'
    }
]   