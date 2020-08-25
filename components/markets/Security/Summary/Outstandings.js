import React from 'react'

const label = {
    fontWeight: 'bold',
}

export default function Outstandings(props) {
    const { units, ticker, sharePrice, setPrice } = props
    return (
        <>
            <div>
                <span style={label}>Number of outstanding shares: &nbsp;</span>
                <span>{units}</span>
            </div>
            <div style={{ display: 'flex' }}>
                <label style={label} htmlFor="price">
                    Enter a price for ${ticker.toUpperCase()} : &nbsp;
                </label>
                <input
                    id="price"
                    type="number"
                    onChange={(ev) => setPrice(ev.target.value)}
                    value={sharePrice}
                />
            </div>
            <div style={{ display: 'flex' }}>
                <span style={label} />
                Value of outstanding shares : &nbsp;
                <span>{(sharePrice * units).toFixed(2)}</span>
            </div>
        </>
    )
}
