import React, { useState } from 'react'
import { Form, Col , Row } from 'react-bootstrap'
import { Outcome, CalculatorForm } from '../components/Calculator'

export default function CalculatorContainer() {
    let [buyPrice, setBuy] = useState(55.00)
    let [shares, setShares] = useState(1000)
    let [fees, setFees] = useState(10)
    let [sellPrice, setSell] = useState(55.00)
    let [percentageMode, setMode] = useState(false)

    buyPrice = parseFloat(buyPrice)
    sellPrice = parseFloat(sellPrice)
    
    return (
        <div style={{ textAlign: "left" }}>
            <Row className="justify-content-between">
                <CalculatorForm 
                    buyPrice={buyPrice}
                    setBuy={setBuy}
                    sellPrice={sellPrice}
                    setSell={setSell}
                    shares={shares}
                    setShares={setShares}
                    fees={fees}
                    setFees={setFees}
                />
                <Col xs md={6}>
                    <Col>
                        <Form.Label></Form.Label>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label={percentageMode ? "Percentage" : "Dollar value" }
                            status={percentageMode ? 0 : 1}
                            onChange={() => setMode(!percentageMode)}
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

            
            
        </div>
    )
}