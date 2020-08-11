import React from 'react'
import Link from 'next/Link'
import { Row, Col, Jumbotron } from 'react-bootstrap'

export default function Home () {
    

    return <Row style={{ textAlign: 'center', marginTop: '100px' }}>
                    <Col xs={4}>
                        <Jumbotron>
                            <Link href='/markets'>
                                <a> MeMarkets</a>
                            </Link>
                        </Jumbotron>
                    </Col>
                    <Col xs={4}>
                        <Jumbotron>
                            <Link href='/accounts'>
                                <a> MeAccounts</a>
                            </Link>
                        </Jumbotron>
                    </Col>
                    <Col xs={4}>
                        <Jumbotron>
                        <Link href='/calculator'>
                                <a> MeCalculator</a>
                            </Link>
                        </Jumbotron>
                    </Col>
                </Row>
      
}