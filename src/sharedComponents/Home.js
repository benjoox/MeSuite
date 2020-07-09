import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Row, Col, Jumbotron } from 'react-bootstrap'
import MePortfolio from '../components/Home'
import MeFinance from '../meFinance/App'


export default function Home () {
    const [comp, setComp] = useState(null)
    const { user } = useAuth0()

    return (
        <>
            {
                !comp 
                ? 
                <Row style={{ textAlign: 'center', marginTop: '100px' }}>
                    <Col xs={6}>
                        <Jumbotron>
                            <Button onClick={() => setComp('meFinance')}>MeFinance</Button>
                        </Jumbotron>
                    </Col>
                    <Col xs={6}>
                        <Jumbotron>
                            <Button onClick={() => setComp('mePortfolio')}>MePortfolio</Button>
                        </Jumbotron>
                    </Col>
                </Row>
                :
                ''
            }
            
            { comp === 'meFinance' ? <MeFinance /> : '' }
            { comp === 'mePortfolio' ? <MePortfolio /> : '' }
        </>
    )
}