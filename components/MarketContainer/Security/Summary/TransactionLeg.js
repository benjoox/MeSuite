import React from 'react'

const labelStyle = {
    fontWeight: 'bold',
}

export default function TransactionLeg(props) {
    const { type, cost, units, fees } = props
    return (
        <>
            <div>
                <div style={labelStyle}>Total {type} cost: &nbsp;</div>
                <span>{cost}</span>
            </div>
            <div>
                <div style={labelStyle}>Total number {type}: &nbsp;</div>
                <span>{units}</span>
            </div>
            <div>
                <div style={labelStyle}>Total {type} fees: &nbsp;</div>
                <span>{fees}</span>
            </div>
            <div>
                <div style={labelStyle}>Average {type} price: &nbsp;</div>
                <span>{(cost / units).toFixed(3)}</span>
            </div>
        </>
    )
}
