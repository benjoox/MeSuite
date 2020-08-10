import React, { useState } from 'react'
import { Form, Col , Row } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import InputWithSlider from '../components/portfolio/UIElements/InputWithSlider'
import Outcome from '../components/portfolio/Calculator/Outcome'
import Charts from '../components/portfolio/UIElements/Charts'

export default function CalculatorContainer() {
    let [buyPrice, setBuy] = useState(55.00)
    let [shares, setShares] = useState(1000)
    let [fees, setFees] = useState(10)
    let [sellPrice, setSell] = useState(55.00)
    let [percentageMode, setMode] = useState(false)

    function setNumberOfShares(ev) {
        ev.preventDefault()
        setShares(ev.target.value)
    }

    function setBuyPrice(ev) {
        ev.preventDefault()
        setBuy(parseFloat(ev.target.value))
    }

    function setSellPrice(ev) {
        ev.preventDefault()
        setSell(parseFloat(ev.target.value))
    }

    function toggleMode() {
        setMode(!percentageMode)
    }

    function setBrokerageFees(ev) {
        ev.preventDefault()
        setFees(parseFloat(ev.target.value))
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
                        steps={0.01}
                        min={0}
                        max={200}
                    />
                    <InputWithSlider 
                        value={shares}
                        onChange={setNumberOfShares}
                        label="Number of shares"
                        placeholder="Number of shares"
                        steps={1}
                        min={0}
                        max={10000}
                    /> 
                    <InputWithSlider 
                        value={sellPrice}
                        onChange={setSellPrice}
                        label="Sell price"
                        placeholder="Sell price"
                        steps={0.01}
                        min={0}
                        max={200}
                    />
                    <InputWithSlider 
                        onChange={setBrokerageFees}
                        label="Brokerage fees"
                        placeholder="10"
                        value={fees}
                        steps={1}
                    /> 
                </Col>
                <Col  xs md={6}>
                    <Col>
                        <Form.Label></Form.Label>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label={percentageMode ? "Percentage" : "Dollar value" }
                            status={0}
                            onChange={toggleMode}
                        />
                    </Col>
                
                    <Outcome 
                        buyPrice={buyPrice}
                        sellPrice={sellPrice}
                        shares={shares}
                        fees={fees}
                        percentageMode={percentageMode}
                    />
                </Col>
            </Row>

            
            <Charts />
        </div>
    )
}