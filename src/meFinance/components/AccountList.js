import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Nav, Container } from 'react-bootstrap';
import AccountContainer from './AccountContainer'

export default function AccountList(props) {
    const [key, setKey] = useState('home');
    useEffect(() => setKey('cbaPersonalSmart'), [props])
    return (
        <Container style={{ padding: '20px', maxWidth: '1340px' }} >
            <Row style={{ position: 'fixed' }}>
                    <h1>MeFinance</h1>
            </Row>
        
            <Tab.Container defaultActiveKey="cbaPersonalSmart">
                
                <Row style={{ marginTop: '100px' }}>
                <Col sm={2} style={{ position: 'fixed' }} >
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="cbaPersonalSmart">CBA Personal</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cba-moPersonal">CBA Mo Personal</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="nabPersonal">NAB Offset FY19/20</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="nab-personal_FY1819">NAB Offset FY18/19</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="nabCredit">NAB Credit</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cbaCDIA">CBA CDIA</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cbaPortfolio">CBA Portfolio</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="AA_CDIA">AA CDIA</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="AA_account_transactions">AA Account transactions</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="loan-dandenong">Loan Dandenong</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="loan-hoppers">Loan Hoppers</Nav.Link>
                        </Nav.Item>
                        
                    </Nav>
                </Col>
                <Col sm={9} style={{ marginLeft: '300px' }}>
                    <Tab.Content>
                        <Tab.Pane eventKey="cbaPersonalSmart">
                                <AccountContainer name='cbaPersonalSmart'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="cba-moPersonal">
                                <AccountContainer name='cba-moPersonal'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="nabPersonal">
                                <AccountContainer name='nabPersonal'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="nab-personal_FY1819">
                                <AccountContainer name='nab-personal_FY1819'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="nabCredit">
                                <AccountContainer name='nabCredit'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="cbaCDIA">
                                <AccountContainer name='cbaCDIA'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="cbaPortfolio">
                                <AccountContainer name='cbaPortfolio'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="AA_CDIA">
                                <AccountContainer name='AA_CDIA'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="AA_account_transactions">
                            <AccountContainer name='AA_account_transactions'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="loan-dandenong">
                            <AccountContainer name='loan-dandenong'/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="loan-hoppers">
                            <AccountContainer name='loan-hoppers'/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

