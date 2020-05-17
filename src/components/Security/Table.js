import React, { useContext } from 'react'
import Table from '../UIElements/Table'
import Consolidated from './Summary/Consolidated'
import Context from './Context'

export default function SecurityTable () {
    const { listWithAvg , totalFees, totalPandLBeforeFees } = useContext(Context)
    
    const pAndL = (totalPandLBeforeFees - totalFees).toFixed(3)
    return <> 
        <Table list={listWithAvg} column={column} />
        <Consolidated fees={totalFees} pAndL={pAndL} />
    </>
}

const column = [
    {
        Header: 'Code',
        accessor: 'code',
        filter: 'fuzzyText',
    },
    {
        Header: 'Units',
        accessor: 'units',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Names`,
    },
    {
        Header: 'Type',
        accessor: 'type',
        width: '10',
        maxWidth: '10'
    },
    {
        Header: 'Fees',
        accessor: 'fees',
        width: 10
    },
    {
        Header: 'Price',
        accessor: 'price',
        width: 10
    },
    {
        Header: 'Date',
        accessor: row =>  typeof row.date === 'object' ? row.date.format("Do MMM") : row.date,
    },
    {
        Header: 'Net',
        accessor: row => (row.price * row.units).toFixed(2),
    },
    {
        Header: 'Average Price',
        accessor: 'average',
    },
    {
        Header: '# Outstanding shares',
        accessor: 'outstandingUnits',
    },
    {
      Header: 'P/L (exc. fees)',
      accessor: 'profitAndLossBeforeFees',
    }
]