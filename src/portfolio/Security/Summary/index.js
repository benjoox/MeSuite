import React, { useState, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import TransactionSide from './TransactionLeg'
import Outstandings from './Outstandings'
import Consolidated from './Consolidated'
import SecurityContext from '../Context'

export default function Summary(props) {
    const [sharePrice, setPrice] = useState(0)
    const context = useContext(SecurityContext)

    const { 
        buy, 
        sell, 
        code,
        totalFees
    } = context
     
    const outstandingUnits = buy.units - sell.units
    const newTrade =  sharePrice ? (outstandingUnits * sharePrice) - 19.95 : 0
    const totalPandL = sell.cost - buy.cost - buy.fees - sell.fees + newTrade
    return (
        <>
            <Row className="justify-content-around">
                <Col md={3}>
                    <TransactionSide 
                        units={buy.units}
                        cost={buy.cost}
                        fees={buy.fees}
                        type='Buy'
                   />
                </Col>
                
                <Col md={3}>
                   <TransactionSide 
                        units={sell.units}
                        cost={sell.cost}
                        fees={sell.fees}
                        type='Sell'
                   />
                </Col>

                <Col md={5}>
                    <Outstandings 
                        setPrice={setPrice}
                        units={outstandingUnits}
                        sharePrice={sharePrice}
                        code={code}
                    />
                </Col>
            </Row>
            <Consolidated 
                sharePrice={sharePrice}
                totalFees={totalFees}
                pAndL={totalPandL}
            />
        </>
    )
}