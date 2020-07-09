import React from 'react'
import Link from 'next/Link'
import { Row, Col, Jumbotron } from 'react-bootstrap'

export default function Home () {
    return (<Row style={{ textAlign: 'center', marginTop: '100px' }}>
                <Col xs={6}>
                    <Jumbotron>
                        <Link href='/portfolio'>
                            <a> MePortfolio </a>
                        </Link>
                    </Jumbotron>
                </Col>
                <Col xs={6}>
                    <Jumbotron>
                    <Link href='/accounts'>
                            <a> MeAccounts </a>
                        </Link>
                    </Jumbotron>
                </Col>
            </Row>
    )
}