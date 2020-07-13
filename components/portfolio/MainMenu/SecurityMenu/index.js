import React from 'react'
import { Nav } from 'react-bootstrap'

export default function SecurityMenu(props) {
    return <>
    { 
        props.tickers.map(ticker => <Nav.Item key={ticker}>
                <Nav.Link eventKey={ticker} title={ticker}>{ticker}</Nav.Link>
            </Nav.Item>
        )
    }
    </>
}   