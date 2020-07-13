import React, { useContext } from 'react'
import { number } from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import Context from '../Context'

export default function Consolidated (props) {
    const { sell, buy } = useContext(Context)
    
    return <Row 
        className="justify-content-around" 
        style={{ 
            margin: '15px 0', 
            padding:'15px 0',
            border: 'solid #27a745 3px',
            borderRadius: '5px'
        }}
    >
        <Col>
            <div>
                <label 
                    style={label} 
                    dangerouslySetInnerHTML={{__html : 'Profit/Loss: &nbsp'}} 
                />
                <span>{props.pAndL}</span>
                <div 
                    style={finePrint} 
                    dangerouslySetInnerHTML={{__html : '(fees are included) &nbsp'}} 
                />
            </div>
        </Col>
        <Col>
            <div>
                <label 
                    style={label} 
                    dangerouslySetInnerHTML={{__html : 'Fees : &nbsp'}} 
                />
                <span>{(props.fees || (buy.fees + sell.fees)).toFixed(3)}</span>
            </div>
        </Col>
    </Row>
}

const label = { fontWeight: 'bold' , margin: '0px' } 
const finePrint = { fontSize: '12px', margin: '0px 0px 10px 0' }

Consolidated.protoType = {
    pAndL: number.isRequired,
    fees: number.isRequired
}