import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import styled from '@emotion/styled'

const Td = styled.td`
    padding: 25px;
    background-color: ${(props) => {
        console.log('props.profitAndLoss ', props.profitAndLoss)
        return props.profitAndLoss < 0 ? 'red' : props.profitAndLoss > 0 ? 'green' : 'transparent'  
    }}
`

export default function Trade (props) {
    const trade={}
    for(var key in props) {
        if(key === 'units' && typeof props[key] === 'string') 
            trade[key] = parseFloat(props[key].replace(",",""))
        else
            trade[key.toLowerCase()] = props[key] ? props[key] : ''
    }


    function toDecimalPoints(value) { 
        return value ? value.toFixed(2) : value 
    }

    return (<tr style={{ fontSize: '13px' }}>
                <td style={{ marginBottom: 0 }}>
                    <Form.Check type="checkbox" onChange={() => props.select(trade)}/>
                </td>
                <Td>{trade.code}</Td>
                <Td>{trade.units}</Td>
                <Td>{trade.type}</Td>
                <Td>{trade.fees}</Td>
                <Td >{trade.price}</Td>
                <Td >{trade.date}</Td>
                <Td >{parseFloat(trade.units) * parseFloat(trade.price) + trade.fees}</Td>
                <Td >{props.averagePrice ? (props.averagePrice).toFixed(2) : props.averagePrice}</Td>
                <Td >{props.outstandingNumberOfSecurity}</Td>
                <Td >{ toDecimalPoints(props.costSum) }</Td>
                <Td profitAndLoss={props.profitAndLoss}>{toDecimalPoints(props.profitAndLoss)}</Td>
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