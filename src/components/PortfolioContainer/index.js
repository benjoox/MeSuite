import React, { useState } from 'react'
import { Form, Col , Row, Container } from 'react-bootstrap'
import InputWithSlider from './InputWithSlider'
import Outcome from './Outcome'
import Charts from './Charts'
import TradeContainer from '../TradeContainer'

export default function PortfolioContainer() {
    let [buyPrice, setBuy] = useState(55.00)
    let [shares, setShares] = useState(1000)
    let [fees, setFees] = useState(10)
    let [sellPrice, setSell] = useState(55.00)
    let [priceChangeMode, setMode] = useState(false)
    const [series, setSeries] = useState()

    function setNumberOfShares(ev) {
        ev.preventDefault()
        setShares(ev.target.value)
    }

    function constructData(series) {
        const result = []
        let counter = 0
        for (const property in series) {
            const innerArray = [] 
            const data = series[property]
            innerArray.push(property)
            innerArray.push(data['3. low'])
            innerArray.push(data['1. open'])
            innerArray.push(data['4. close']) 
            innerArray.push(data['2. high'])
            
            result[counter] = innerArray
            counter++
          }

          return result 
    }

    async function fetchIntradayPrice() {
        try {
            const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=cba.ax&interval=5min&apikey=TYTH6WSR5AYPF032')
            const data = await response.json()
            constructData(data['Time Series (5min)'])
        } catch(err) {
            console.error(err)
        }
        
    }
    fetchIntradayPrice()
    function setBuyPrice(ev) {
        ev.preventDefault()
        setBuy(parseFloat(ev.target.value))
    }

    function setSellPrice(ev) {
        ev.preventDefault()
        setSell(parseFloat(ev.target.value))
    }

    function toggleMode() {
        setMode(!priceChangeMode)
    }

    function setBrokerageFees(ev) {
        ev.preventDefault()
        setFees(ev.target.value)
    }
    buyPrice = parseFloat(buyPrice)
    sellPrice = parseFloat(sellPrice)
    
    return (
        <div style={{ textAlign: "left" }}>
            
            <Row className="justify-content-between">
                <Col xs md={5}>
                    <InputWithSlider 
                        value={buyPrice}
                        onChange={setBuyPrice}
                        label="Buy price"
                        placeholder="Buy price"
                    />
                    <InputWithSlider 
                        value={shares}
                        onChange={setNumberOfShares}
                        label="Number of shares"
                        placeholder="Number of shares"
                    /> 
                    <InputWithSlider 
                        value={sellPrice}
                        onChange={setSellPrice}
                        label="Sell price"
                        placeholder="Sell price"
                    />
                    <InputWithSlider 
                        onChange={setBrokerageFees}
                        label="Brokerage fees"
                        placeholder="10"
                        value={fees}
                    /> 
                </Col>
                <Col  xs md={6}>
                    <Form.Label></Form.Label>
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label={priceChangeMode ? "Percentage" : "Dollar value" }
                        status={0}
                        onChange={toggleMode}
                    />
                
                    <Outcome 
                        buyPrice={buyPrice}
                        sellPrice={sellPrice}
                        shares={shares}
                        fees={fees}
                    />
                </Col>
            </Row>

            
            <Charts />
        </div>
    )
}