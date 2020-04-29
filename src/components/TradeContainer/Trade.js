import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'


export default function Trade (props) {
    const trade={}
    for(var key in props) {
        if(key === 'units' && typeof props[key] === 'string') 
            trade[key] = parseFloat(props[key].replace(",",""))
        else
            trade[key.toLowerCase()] = props[key] ? props[key] : ''
    }
    return (<tr style={{ fontSize: '13px' }}>
                <td style={{ marginBottom: 0 }}>
                    <Form.Group style={{ padding: '0.25rem' }}>
                        <Form.Check type="checkbox" onChange={() => props.select(trade)}/>
                    </Form.Group>
                </td>
                <td style={{ padding: '0.25rem' }} >{trade.code}</td>
                <td style={{ padding: '0.25rem' }}>{trade.units}</td>
                <td style={{ padding: '0.25rem' }}>{trade.type}</td>
                <td style={{ padding: '0.25rem' }}>{trade.fees}</td>
                <td style={{ padding: '0.25rem' }}>{trade.price}</td>
                <td style={{ padding: '0.25rem' }}>{trade.date}</td>
                <td style={{ padding: '0.25rem' }}>{parseFloat(trade.units) * parseFloat(trade.price) + trade.fees}</td>
                <td style={{ padding: '0.25rem' }}>{props.averagePrice ? (props.averagePrice).toFixed(2) : props.averagePrice}</td>
                <td style={{ padding: '0.25rem' }}>{props.outstandingNumberOfSecurity}</td>
                <td style={{ padding: '0.25rem' }}>{props.costSum ? (props.costSum).toFixed(2) : props.costSum}</td>
                
            </tr>
    )
}

Trade.propTypes = {
    /*  A trade object with the following properties
    *   units: number
    *   code: string
    *   type: string (one of 'b' or 's')
    *   price: number
    *   date: string
    *   net: string
    *   averagePrice: number (average buy prices up until the sell)
    *   outstandingNumberOfSecurity: number (number of outstanding securities after the sell)
    */
    trades: PropTypes.objects
}