import React, { useState } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import TradeTable from './TradeTable'
import TradeSummary from './TradesSummary'
import TradeActionsContainer from './TradeActionsContainer'


export default function TradeContainer() {
  const [trades, setTrades] = useState([])
  const [selectedTrade, selectTrade] = useState(null)
  const [collapse, setCollapse] = useState(true)
  const [error, setError] = useState('')

  function add(trade) {
    console.log('adding new trade to the list ', trade)
    const newTrade = [...trades, trade]
    setTrades(newTrade)
  }
   
  function handleSelect (trade) {
    const found = trades.find(el => el.code === trade.code)

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

  const summary = () => getTradeSummary(trades)

  function uploadCSVFile(uploadedJSON) {
    const { accepted, rejected } = validateUploadedJSON(uploadedJSON, trades)
    
    setTrades(accepted)
  } 
  
  return( 
      <div>
        { error ? <div>{error}</div> : ''}
        <TradeActionsContainer 
          save={save} 
          selectedTrade={selectedTrade}
          uploadCSVFile={uploadCSVFile}
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
        { 
          !trades || trades.length === 0 ? null : <TradeSummary assetList={summary()}/>
        }
      </div>
  )
}

function validateUploadedJSON(uploadedJSON, trades) {
  return uploadedJSON.reduce((accumulator, current)  => {
    const price = typeof current.price === 'string' ? parseFloat(current.price.replace(",", "")) : parseFloat(current.price)
    const units = typeof current.units === 'string' ? parseFloat(current.units.replace(",", "")) : parseFloat(current.units)
    const fees = typeof current.fees === 'string' ? parseFloat(current.fees.replace(",", "")) : parseFloat(current.fees)
    
    const found = trades.find(trade => {
      return current.code === trade.code 
        && current.date === trade.date
        && units === trade.units
        && price === trade.price
        && fees === trade.fees
    })

    if(found) accumulator.rejected.push(current)
    else accumulator.accepted.push(current)
    
    return accumulator
  }, { accepted: [], rejected: [] })
}

function getTradeSummary(trades) {
  return trades.reduce((result, trade) => {
    const price = typeof trade.price === 'string' ? parseFloat(trade.price.replace(",", "")) : parseFloat(trade.price)
    const units = typeof trade.units === 'string' ? parseFloat(trade.units.replace(",", "")) : parseFloat(trade.units)
    const fees = typeof trade.fees === 'string' ? parseFloat(trade.fees.replace(",", "")) : parseFloat(trade.fees)
    
    if(!result[trade.code]) result = {...result, [trade.code]: {} }
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
}