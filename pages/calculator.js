import React, { useState } from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import { Outcome, CalculatorForm } from '../components/calculator'

export default function CalculatorContainer() {
    const [buyPrice, setBuy] = useState((x = 55.0) => parseFloat(x))
    const [shares, setShares] = useState(1000)
    const [fees, setFees] = useState(10)
    const [sellPrice, setSell] = useState((x = 55.0) => parseFloat(x))
    const [percentageMode, setMode] = useState(false)

    return (
        <div style={{ textAlign: 'left' }}>
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
                        <Form.Label />
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={
                                percentageMode ? 'Percentage' : 'Dollar value'
                            }
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
