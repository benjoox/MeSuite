import React, { useState } from 'react'
import { Table, Row, Col, Button, Jumbotron } from 'react-bootstrap'
import TradeTable from './TradeTable'
import TradeSummary from './TradesSummary'


export default function TradeContainer() {

    function add() {
        console.log('add')
    }

    function edit() {
        console.log('edit')
    }
    
    function remove() {
        console.log('remove')
    }
    const summary = () => trades.reduce((result, trade) => {
      const price = typeof trade.purchase === 'string' ? parseFloat(trade.purchase.replace(",", "")) : parseFloat(trade.purchase)
      const units = typeof trade.units === 'string' ? parseFloat(trade.units.replace(",", "")) : parseFloat(trade.units)
      const brokerage = typeof trade.brokerage === 'string' ? parseFloat(trade.brokerage.replace(",", "")) : parseFloat(trade.brokerage)
      
      if(!result[trade.buy]) result = {...result, [trade.buy]: {} }

      const tradeCost = price * units + brokerage
      const code = trade.buy
      const temp = result[code]

      if(trade.sell.toLowerCase() === 'b') {
        

        result = {...result, 
          [code] : { 
            ...temp,                   
            totalBuyCost: temp['totalBuyCost'] 
              ? temp['totalBuyCost'] + tradeCost 
              : 
              tradeCost,  
            totalNumberBuy: temp['totalNumberBuy']  ? temp['totalNumberBuy'] + units : units,
            totalBrokerageCost: temp['totalBrokerageCost'] ? temp['totalBrokerageCost'] + brokerage : brokerage
          } 
        } 
      } else if(trade.sell.toLowerCase() === 's') {
        result = {...result, 
          [code] : { 
            ...temp, 
            totalSellCost: temp['totalSellCost'] ? temp['totalSellCost'] + tradeCost : tradeCost,
            totalNumberSell: temp['totalNumberSell'] ? temp['totalNumberSell'] + units : units, 
            totalBrokerageCost: temp['totalBrokerageCost'] ? temp['totalBrokerageCost'] + brokerage : brokerage 
          }
        } 
      } 
      return result
    }, {})
    console.log('summary is ', summary())
    return( 
        <div>
          <TradeSummary assetList={summary()}/>
          <TradeTable trades={trades} />
            <Row className="justify-content-around">
              <>
                <Button variant="dark" onClick={add}>Add</Button>
                <Button variant="outline-dark" onClick={edit}>Edit</Button>
                <Button variant="outline-dark" onClick={remove}>Remove</Button>
              </>
            </Row>
        </div>
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