import React, { useState } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import Trade from './Trade'

export default function TradeTable(props) {

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
                </tr>
            </thead>
            <tbody> 
                {
                    props.trades.map(trade => <Trade 
                            key={trade.code}
                            {...trade}
                            select={props.select}
                        />
                    )
                }
            </tbody>
        </Table>
    )
}

const trades = [
    {
      "code": "N118841028",
      "units": "1,000",
      "sell": "B",
      "buy": "SCG",
      "purchase": 2.04,
      "Last Price": "",
      "buydDate": "22/04/2020",
      "brokerage": 19.95,
      "totalCost": "2,059.95"
    },
    {
      "code": "N116986862",
      "units": 100,
      "sell": "B",
      "buy": "CBA",
      "purchase": 58,
      "Last Price": "",
      "buydDate": "22/04/2020",
      "brokerage": 19.95,
      "Total buy cost": "5,819.95"
    },
    {
      "code": "N118841063",
      "units": 50,
      "sell": "B",
      "buy": "CBA",
      "purchase": 59.8,
      "Last Price": "",
      "buydDate": "21/04/2020",
      "brokerage": 19.95,
      "Total buy cost": "3,009.95"
    },
    {
      "code": "N118841042",
      "units": "1,000",
      "sell": "B",
      "buy": "SCG",
      "purchase": 2.08,
      "Last Price": "",
      "buydDate": "21/04/2020",
      "brokerage": 19.95,
      "Total buy cost": "2,099.95"
    },
    {
      "code": "N118268941",
      "units": -50,
      "sell": "S",
      "buy": "CBA",
      "purchase": 61.5,
      "Last Price": "",
      "buydDate": "20/04/2020",
      "brokerage": 19.95,
      "Total buy cost": ""
    },
    {
      "code": "N118268964",
      "units": 50,
      "sell": "B",
      "buy": "CBA",
      "purchase": 60.5,
      "Last Price": "",
      "buydDate": "20/04/2020",
      "brokerage": 19.95,
      "Total buy cost": 3044.95
    },
    {
      "code": "N118623666",
      "units": "-1,000",
      "sell": "S",
      "buy": "SCG",
      "purchase": 2.18,
      "Last Price": "",
      "buydDate": "17/04/2020",
      "brokerage": 19.95,
      "Total buy cost": ""
    },
    {
      "code": "N118623695",
      "units": "-1,000",
      "sell": "S",
      "buy": "SCG",
      "purchase": 2.27,
      "Last Price": "",
      "buydDate": "17/04/2020",
      "brokerage": 19.95,
      "Total buy cost": ""
    },
    {
      "code": "N118382275",
      "units": "1,000",
      "sell": "B",
      "buy": "SCG",
      "purchase": 1.97,
      "Last Price": "",
      "buydDate": "16/04/2020",
      "brokerage": 19.95,
      "Total buy cost": 1989.95
    },
    {
      "code": "N118382152",
      "units": "1,000",
      "sell": "B",
      "buy": "SCG",
      "purchase": 2.04,
      "Last Price": "",
      "buydDate": "16/04/2020",
      "brokerage": 19.95,
      "Total buy cost": 2059.95
    },
    {
      "code": "N117731156",
      "units": "1,000",
      "sell": "B",
      "buy": "SCG",
      "purchase": 2.03,
      "Last Price": "",
      "buydDate": "16/04/2020",
      "brokerage": 19.95,
      "Total buy cost": 2049.95
    },
    {
      "code": "N117542042",
      "units": -50,
      "sell": "S",
      "buy": "CBA",
      "purchase": 62.75,
      "Last Price": "",
      "buydDate": "14/04/2020",
      "brokerage": 19.95,
      "Total buy cost": ""
    },
    {
      "code": "N118041866",
      "units": "3,000",
      "sell": "B",
      "buy": "SCG",
      "purchase": 1.68,
      "Last Price": "",
      "buydDate": "08/04/2020",
      "brokerage": 19.95,
      "Total buy cost": 5059.95
    },
    {
      "code": "N118121463",
      "units": "-3,000",
      "sell": "S",
      "buy": "SCG",
      "purchase": 1.89,
      "Last Price": "",
      "buydDate": "08/04/2020",
      "brokerage": 19.95,
      "Total buy cost": ""
    },
    {
      "code": "N117730962",
      "units": "-3,000",
      "sell": "S",
      "buy": "SCG",
      "purchase": 1.85,
      "Last Price": "",
      "buydDate": "07/04/2020",
      "brokerage": 19.95,
      "Total buy cost": ""
    },
    {
      "code": "N117542080",
      "units": "3,000",
      "sell": "B",
      "buy": "SCG",
      "purchase": 1.68,
      "Last Price": "",
      "buydDate": "02/04/2020",
      "brokerage": 19.95,
      "Total buy cost": 5059.95
    },
    {
      "code": "N116901442",
      "units": 100,
      "sell": "B",
      "buy": "CBA",
      "purchase": 55,
      "Last Price": "",
      "buydDate": "24/03/2020",
      "brokerage": 19.95,
      "Total buy cost": 5519.95
    }
  ]