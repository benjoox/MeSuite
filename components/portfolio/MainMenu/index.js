import React from 'react'
import { Nav, Col } from 'react-bootstrap'
import SecurityMenu from './SecurityMenu'

export default function MainMenu (props) {
    return (
        <Col sm={2}>
            <Nav variant="links" className="flex-column">
                <Nav.Item>
                    <Nav.Link eventKey="portfolio" title="Portfolio">Portfolio</Nav.Link>
                </Nav.Item>
                { 
                    props.tickers.length > 0 
                    ? 
                    <SecurityMenu tickers={props.tickers} />
                    :
                    ''
                }
                <Nav.Item>
                    <Nav.Link eventKey="calculator">Calculators</Nav.Link>
                </Nav.Item>
            </Nav>
        </Col>
    )
}