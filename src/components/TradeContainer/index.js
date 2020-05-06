import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import TradeTable from './TradeTable'
import TradeSummary from './TradesSummary'
import TradeActionsContainer from './TradeActionsContainer'
import { getTradeSummary, validateUploadedJSON ,seperateTradesBySecurity, seperateTradesByTickers } from './_utils'

const sample = require('./sampleTrade.json')

export const PortfolioContext = React.createContext()

export default function TradeContainer() {
  const [trades, setTrades] = useState([])
  const [tradesMap, setTradesMap] = useState(null)
  const [selectedTrade, selectTrade] = useState(null)
  const [collapse, setCollapse] = useState(true)
  const [error, setError] = useState('')

  function update() {
    console.log('we can update hello from the provider root')
  }
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
    const tradeMap = seperateTradesByTickers(accepted)
    setTradesMap(tradeMap)
    setError('this is an error ')
  } 
  console.log('trades ', trades)
  console.log('tradesMap ', tradesMap)
  console.log('error ', error)
  return ( 
      <PortfolioContext.Provider value={{ trades, uploadCSVFile, tradesMap }} >
        { error ? <div>{error}</div> : ''}
        <TradeActionsContainer 
          save={save} 
          selectedTrade={selectedTrade}
        >
          <Button variant="success" onClick={()=> { setCollapse(!collapse) }}>
              { collapse ? 'Show your transaction list' : 'Hide list' }
          </Button>
        </TradeActionsContainer>
      
        { 
          !trades || trades.length === 0 ? null : <TradeSummary />
        }
        
      </PortfolioContext.Provider>
  )
}