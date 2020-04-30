import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import Trade from './Trade'

export default function TradeTable(props) {

    if(!props.trades || Object.keys(props.trades).length === 0) return <div>Upload your data first</div>

    return( 
          <Table striped bordered hover 
            style={{ 
              display: props.collapse ? 'none' :'table-row-group',
              overflow: 'hidden'
            }}
          >
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Code</th>
                    <th>Units</th>
                    <th>Type</th>
                    <th>Fees</th>
                    <th>Price ($)</th>
                    <th>Date</th>
                    <th>Net</th>
                    <th>Average Price</th>
                    <th>Number of outstanding shares</th>
                    <th>Sum the cost of trades</th>
                    <th>P/L</th>
                </tr>
            </thead>
            <tbody> 
                {
                    props.trades.map(trade => <Trade 
                            key={trade.code + Math.random() % 100}
                            {...trade}
                            select={props.select}
                        />
                    )
                }
            </tbody>
        </Table>
    )
}

TradeTable.propTypes = {
    trades: PropTypes.array
}