import React, { useState } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import TradeTable from './TradeTable'
import TradeSummary from './TradesSummary'
import TradeActionsContainer from './TradeActionsContainer'


export default function TradeContainer() {
  const [trades, setTrades] = useState(tempTrades)
  const [selectedTrade, selectTrade] = useState(null)
  const [collapse, setCollapse] = useState(true)
  const [error, setError] = useState('')
  function add(trade) {
    console.log('adding new trade to the list ', trade)
    const newTrade = [...trades, trade]
    setTrades(newTrade)
  }
   
  function handleSelect (trade) {
    console.log('trade selected is ', trade)
    
    const found = trades.find(el => el.code === trade.code)
    console.log('trade found is  ', found)

    if(!found) {
      setError(`The trade with id ${trade.id} does not exist`)
      return
    }
    selectTrade(found)
  }
  function edit(id) {
      console.log('edit')
  }
  
  function remove(id) {
      console.log('remove')
  }
  function save(trade, action) {
    switch(action) {
      case('add'): 
        add(trade)
        break
      case('edit'):
      case('remove'): 
        const found = trades.find(el => el.id === trade.id)

        if(!found) {
          setError(`The trade with id ${trade.id} does not exist`)
          return
        }
        // TODO 
        console.log('TODO :: saving the details af a transaction ')
        break
      default:
        break
    }
  }

  const summary = () => trades.reduce((result, trade) => {
 
    const price = typeof trade.price === 'string' ? parseFloat(trade.price.replace(",", "")) : parseFloat(trade.price)
    const units = typeof trade.units === 'string' ? parseFloat(trade.units.replace(",", "")) : parseFloat(trade.units)
    const fees = typeof trade.fees === 'string' ? parseFloat(trade.fees.replace(",", "")) : parseFloat(trade.fees)
    
    if(!result[trade.code]) result = {...result, [trade.code]: {} }
    console.log('temp')
    const tradeCost = price * units
    const temp = result[trade.code]

    if(trade.type.toLowerCase() === 'b') {

      result = {...result, 
        [trade.code] : { 
          ...temp,                   
          totalBuyCost: temp['totalBuyCost'] 
            ? temp['totalBuyCost'] + tradeCost 
            : 
            tradeCost,  
          totalNumberBuy: temp['totalNumberBuy']  ? temp['totalNumberBuy'] + units : units,
          totalBuyFees: temp['totalBuyFees'] ? temp['totalBuyFees'] + fees : fees
        } 
      } 
    } else if(trade.type.toLowerCase() === 's') {

      result = {...result, 
        [trade.code] : { 
          ...temp, 
          totalSellCost: temp['totalSellCost'] ? temp['totalSellCost'] + tradeCost : tradeCost,
          totalNumberSell: temp['totalNumberSell'] ? temp['totalNumberSell'] + units : units, 
          totalSellFees: temp['totalSellFees'] ? temp['totalSellFees'] + fees : fees 
        }
      } 
    } 
    return result
  }, {})

  return( 
      <div>
        { error ? <div>{error}</div> : ''}
        <TradeActionsContainer 
          save={save} 
          selectedTrade={selectedTrade}
        >
          <Button variant="success" onClick={()=> { setCollapse(!collapse) }}>
              { collapse ? 'Show your transaction list' : 'Hide list' }
          </Button>
        </TradeActionsContainer>
        <TradeTable 
          collapse={collapse}
          trades={trades} 
          select={handleSelect}
        />
        <TradeSummary assetList={summary()}/>
      </div>
  )
}

const tempTrades = [
  {
    "orderNumber": "N116986862",
    "date": "22/04/2020",
    "type": "B",
    "code": "CBA",
    "units": 100,
    "price": 58,
    "fees": 19.95,
    "net": 5819.95
  },
  {
    "orderNumber": "N118841028",
    "date": "22/04/2020",
    "type": "B",
    "code": "SCG",
    "units": 1000,
    "price": 2.04,
    "fees": 19.95,
    "net": 2059.95
  },
  {
    "orderNumber": "N118841042",
    "date": "21/04/2020",
    "type": "B",
    "code": "SCG",
    "units": 1000,
    "price": 2.08,
    "fees": 19.95,
    "net": 2099.95
  },
  {
    "orderNumber": "N118841063",
    "date": "21/04/2020",
    "type": "B",
    "code": "CBA",
    "units": 50,
    "price": 59.8,
    "fees": 19.95,
    "net": 3009.95
  },
  {
    "orderNumber": "N118268941",
    "date": "20/04/2020",
    "type": "S",
    "code": "CBA",
    "units": 50,
    "price": 61.5,
    "fees": 19.95,
    "net": 3055.05
  },
  {
    "orderNumber": "N118268964",
    "date": "20/04/2020",
    "type": "B",
    "code": "CBA",
    "units": 50,
    "price": 60.5,
    "fees": 19.95,
    "net": 3044.95
  },
  {
    "orderNumber": "N118623666",
    "date": "17/04/2020",
    "type": "S",
    "code": "SCG",
    "units": 1000,
    "price": 2.18,
    "fees": 19.95,
    "net": 2160.05
  },
  {
    "orderNumber": "N118623695",
    "date": "17/04/2020",
    "type": "S",
    "code": "SCG",
    "units": 1000,
    "price": 2.27,
    "fees": 19.95,
    "net": 2250.05
  },
  {
    "orderNumber": "N118382275",
    "date": "16/04/2020",
    "type": "B",
    "code": "SCG",
    "units": 1000,
    "price": 1.97,
    "fees": 19.95,
    "net": 1989.95
  },
  {
    "orderNumber": "N117731156",
    "date": "16/04/2020",
    "type": "B",
    "code": "SCG",
    "units": 1000,
    "price": 2.03,
    "fees": 19.95,
    "net": 2049.95
  },
  {
    "orderNumber": "N118382152",
    "date": "16/04/2020",
    "type": "B",
    "code": "SCG",
    "units": 1000,
    "price": 2.04,
    "fees": 19.95,
    "net": 2059.95
  },
  {
    "orderNumber": "N117542042",
    "date": "14/04/2020",
    "type": "S",
    "code": "CBA",
    "units": 50,
    "price": 62.75,
    "fees": 19.95,
    "net": 3117.55
  },
  {
    "orderNumber": "N118041866",
    "date": "08/04/2020",
    "type": "B",
    "code": "SCG",
    "units": 3000,
    "price": 1.68,
    "fees": 19.95,
    "net": 5059.95
  },
  {
    "orderNumber": "N118121463",
    "date": "08/04/2020",
    "type": "S",
    "code": "SCG",
    "units": 3000,
    "price": 1.89,
    "fees": 19.95,
    "net": 5650.05
  },
  {
    "orderNumber": "N117730962",
    "date": "07/04/2020",
    "type": "S",
    "code": "SCG",
    "units": 3000,
    "price": 1.85,
    "fees": 19.95,
    "net": 5530.05
  },
  {
    "orderNumber": "N117542080",
    "date": "02/04/2020",
    "type": "B",
    "code": "SCG",
    "units": 3000,
    "price": 1.68,
    "fees": 19.95,
    "net": 5059.95
  },
  {
    "orderNumber": "N116901442",
    "date": "24/03/2020",
    "type": "B",
    "code": "CBA",
    "units": 100,
    "price": 55,
    "fees": 19.95,
    "net": 5519.95
  }
]