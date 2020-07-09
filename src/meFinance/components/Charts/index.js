import * as React from "react";
import { Chart } from "react-google-charts";

export default function Charts(props) {
    const temp = props.data.reduce((acc, transaction) => {
        return {...acc, [transaction.category]: acc[transaction.category] ? acc[transaction.category] + transaction.amount : transaction.amount }
    }, {})
    
    const data = [ ['category', 'amount'] ]
    for(let [k, v] of Object.entries(temp)) {
        if(!k.includes('transfer')) data.push([k, v])
    }
    return (
      <div >
        <Chart
          width={1000}
          height={550}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            legend: 'none',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    );
}