import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import TradeTable from './TradeTable'
import TradeSummary from './TradesSummary'
import TradeActionsContainer from './TradeActionsContainer'
import { getTradeSummary, validateUploadedJSON ,seperateTradesBySecurity } from './_utils'

const sample = require('./sampleTrade.json')

export default function TradeContainer() {
  const [trades, setTrades] = useState([])
  const [selectedTrade, selectTrade] = useState(null)
  const [collapse, setCollapse] = useState(true)
  const [error, setError] = useState('')

  function add(trade) {
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
          !trades || trades.length === 0 ? null : <TradeSummary assetList={seperateTradesBySecurity(trades)}/>
        }
        
      </div>
  )
}