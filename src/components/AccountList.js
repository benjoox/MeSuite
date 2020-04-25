import React, { useState, useEffect } from 'react'
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import AccountContainer from './AccountContainer'
import PortfolioContainer from './PortfolioContainer'


export default function AccountList() {
    const [key, setKey] = useState('home');
    useEffect(() => setKey('portfolio'))
    return (
        
        <Container>
            <Row>
                <h1>MeFinance</h1>
            </Row>
            <Tabs activeKey={key} onSelect={k => setKey(k)}> 
                <Tab eventKey="cbaPersonalSmart" title="CBA Personal">
                    <AccountContainer name='cbaPersonalSmart'/>
                </Tab>
                <Tab eventKey="cba-moPersonal" title="CBA Mo Personal">
                    <AccountContainer name='cba-moPersonal'/>
                </Tab>
                <Tab eventKey="nabPersonal" title="NAB Offset FY19/20">
                    <AccountContainer name='nabPersonal'/>
                </Tab>
                <Tab eventKey="nab-personal_FY1819" title="NAB Offset FY18/19">
                    <AccountContainer name='nab-personal_FY1819'/>
                </Tab>
                <Tab eventKey="nabCredit" title="NAB Credit">
                    <AccountContainer name='nabCredit'/>
                </Tab>
                <Tab eventKey="portfolio" title="Portfolio">
                    <PortfolioContainer name='portfolio'/>
                </Tab>
            </Tabs>
        </Container>
    )
}

