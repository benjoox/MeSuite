import React, { useContext } from 'react'
import { number } from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import Context from '../Context'

const label = { fontWeight: 'bold', margin: '0px' }
const finePrint = { fontSize: '12px', margin: '0px 0px 10px 0' }

export default function Consolidated(props) {
    const { sell, buy } = useContext(Context)
    const { pAndL, fees } = props
    return (
        <Row
            className="justify-content-around"
            style={{
                margin: '15px 0',
                padding: '15px 0',
                border: 'solid #27a745 3px',
                borderRadius: '5px',
            }}
        >
            <Col>
                <div>
                    <span style={label}>Profit/Loss: &nbsp;</span>
                    <span>{pAndL}</span>
                    <div style={finePrint}>(fees are included) &nbsp;</div>
                </div>
            </Col>
            <Col>
                <div>
                    <span style={label}>Fees : &nbsp;</span>
                    <span>{(fees || buy.fees + sell.fees).toFixed(3)}</span>
                </div>
            </Col>
        </Row>
    )
}

Consolidated.protoType = {
    pAndL: number.isRequired,
    fees: number.isRequired,
}
