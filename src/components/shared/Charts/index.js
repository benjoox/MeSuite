import * as React from 'react'
import { Chart } from 'react-google-charts'

export default function Charts(props) {
    const { data } = props
    const temp = data.reduce((acc, transaction) => {
        return {
            ...acc,
            [transaction.category]: acc[transaction.category]
                ? acc[transaction.category] + transaction.amount
                : transaction.amount,
        }
    }, {})

    const axis = [['category', 'amount']]
    Object.entries(temp).map((el) => {
        if (el[0].includes('transfer')) {
            axis.push(el[0], el[1])
            return true
        }
        return false
    })

    return (
        <div>
            <Chart
                width={1000}
                height={550}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={axis}
                options={{
                    legend: 'none',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}
