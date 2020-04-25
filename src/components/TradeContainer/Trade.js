import React from 'react'
import { Table } from 'react-bootstrap'

export default function Trade (props) {
    const trade={}
    for(var key in props) {
        if(key === 'units' && typeof props[key] === 'string') 
            trade[key] = parseFloat(props[key].replace(",",""))
        else
            trade[key.toLowerCase()] = props[key] ? props[key] : ''
    }
    return (<tr style={{ fontSize: '13px' }}>
                <td style={{ padding: '0.25rem' }} >{trade.code}</td>
                <td style={{ padding: '0.25rem' }}>{trade.units}</td>
                <td style={{ padding: '0.25rem' }}>{trade.sell}</td>
                <td style={{ padding: '0.25rem' }}>{trade.buy}</td>
                <td style={{ padding: '0.25rem' }}>{trade.purchase}</td>
                <td style={{ padding: '0.25rem' }}>{trade.buydDate}</td>
                <td style={{ padding: '0.25rem' }}>{trade.brokerage}</td>
                <td style={{ padding: '0.25rem' }}>{parseFloat(trade.units) * parseFloat(trade.purchase) + trade.brokerage}</td>
            </tr>
    )
}