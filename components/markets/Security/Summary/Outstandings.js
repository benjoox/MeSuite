import React from 'react'

export default function Outstandings (props) {

    return <>
        <div>
            <label 
                style={label} 
                dangerouslySetInnerHTML={{__html : 'Number of outstanding shares: &nbsp'}} 
            />
            <span>{props.units}</span>
        </div>
        <div style={{ display: 'flex'}}>
            <label 
                style={label} 
                dangerouslySetInnerHTML={{__html : `Enter a price for ${props.ticker.toUpperCase()} : &nbsp`}} 
            />
            <input 
                type='number' 
                onChange={ev => props.setPrice(ev.target.value)} 
                value={props.sharePrice}
            />
        </div>
        <div style={{ display: 'flex'}}>
            <label 
                style={label} 
                dangerouslySetInnerHTML={{__html : `Value of outstanding shares : &nbsp`}} 
            />
            <span>{(props.sharePrice * props.units).toFixed(2)}</span>
        </div>
    </>
}

const label = { 
    fontWeight: 'bold' 
}