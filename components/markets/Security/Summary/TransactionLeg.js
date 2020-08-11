import React from 'react'

export default function TransactionLeg(props) {
    return <>
         <div>
            <label 
                style={labelStyle} 
                dangerouslySetInnerHTML={{__html : `Total ${props.type} cost: &nbsp`}} 
            />
            <span>{props.cost}</span>
        </div>
        <div>
            <label 
                style={labelStyle} 
                dangerouslySetInnerHTML={{__html : `Total number ${props.type}: &nbsp`}} 
            />
            <span>{props.units}</span>
        </div>
        <div>   
            <label 
                style={labelStyle} 
                dangerouslySetInnerHTML={{__html : `Total ${props.type} fees: &nbsp`}} 
            />
            <span>{props.fees}</span>
        </div>
        <div>
            <label 
                style={labelStyle} 
                dangerouslySetInnerHTML={{__html : `Average ${props.type} price: &nbsp`}} 
            />
            <span>{(props.cost / props.units).toFixed(3)}</span>
        </div>
    </>
}

const labelStyle = {
    fontWeight: 'bold'
}