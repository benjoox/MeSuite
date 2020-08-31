import React, { useState, useEffect } from 'react'
import Table from '../../shared/Table'
import OutstandingSecurities from './OutstandingSecurities'
import Summary from './Summary'
import {
    consolidate,
    consolidateOutstandings,
    getLastPrice,
    summaryList,
} from './__utils'

const column = [
    {
        Header: 'Code',
        accessor: 'ticker',
    },
    {
        Header: 'Buy',
        accessor: 'buy',
    },
    {
        Header: 'Sell',
        accessor: 'sell',
    },
    {
        Header: 'Available # of assets',
        accessor: 'outstandingUnits',
    },
    {
        Header: 'Total cost (inc. fees)',
        accessor: 'cost',
    },
]

export default function Portfolio({ tradesMap }) {
    if (!tradesMap) return ''

    const [loader, setLoader] = useState(false)
    const [outstandingSecurities, setOutstandingSecurties] = useState([])

    console.log('calling the portfolio function with tradeMaps ', tradesMap)
    const summary = summaryList(Object.entries(tradesMap))
    async function fetchPrice() {
        setLoader(true)
        const result = summary.map((el) => {
            return async (res) => {
                const { lastPrice } = await getLastPrice(el.ticker)
                res({ ...el, lastPrice })
            }
        })
        const allSecurities = await Promise.all(result)
        setLoader(false)
        setOutstandingSecurties(
            allSecurities.filter((ticker) => ticker.outstandingUnits > 0)
        )
    }

    useEffect(() => {
        fetchPrice()
    }, [tradesMap])

    const updatePrice = (ev) => {
        ev.preventDefault()
        const tempList = outstandingSecurities.map((ticker) => {
            if (ticker.ticker === ev.target.id) {
                return { ...ticker, lastPrice: ev.target.value }
            }
            return ticker
        })

        setOutstandingSecurties(tempList)
    }

    const consolidated = consolidate(summary)
    const value = consolidateOutstandings(outstandingSecurities)

    return (
        <div>
            <h2>Portfolio</h2>
            <Summary
                totalBuy={consolidated.totalBuy}
                totalSell={consolidated.totalSell}
                value={value}
            />
            <OutstandingSecurities
                loader={loader}
                outstandingSecurities={outstandingSecurities}
                updatePrice={updatePrice}
            />
            <Table list={summary} column={column} />
        </div>
    )
}
