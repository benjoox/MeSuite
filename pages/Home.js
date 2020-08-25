import React from 'react'
import Link from 'next/link'
import { Row, Col, Jumbotron } from 'react-bootstrap'

export default function Home() {
    return (
        <Row style={{ textAlign: 'center', marginTop: '100px' }}>
            <Col xs={4}>
                <Jumbotron>
                    <Link href="/markets">MeMarkets</Link>
                </Jumbotron>
            </Col>
            <Col xs={4}>
                <Jumbotron>
                    <Link href="/accounts">MeAccounts</Link>
                </Jumbotron>
            </Col>
            <Col xs={4}>
                <Jumbotron>
                    <Link href="/calculator">MeCalculator</Link>
                </Jumbotron>
            </Col>
        </Row>
    )
}
