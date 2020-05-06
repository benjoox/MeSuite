import React, { useState, useEffect } from 'react'
import { Container, Row, Tab, Nav, Col } from 'react-bootstrap';
import TradeContainer from './TradeContainer'
import PortfolioContainer from './CalculatorContainer'

export default function Home() {
    const [key, setKey] = useState('portfolio')
    useEffect(() => setKey('portfolio'))
    return (
        <Container fluid style={{ padding: '2rem' }}>
            <Row>
                <h1>MePortfolio</h1>
            </Row>
            <Tab.Container defaultActiveKey="portfolio">
                <Row>
                    <Col sm={2}>
                        <Nav variant="links" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="portfolio" title="Portfolio">Portfolio</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="calculator">Calculators</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="portfolio">
                                <TradeContainer />
                            </Tab.Pane>
                            <Tab.Pane eventKey="calculator">
                                <PortfolioContainer />  
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

