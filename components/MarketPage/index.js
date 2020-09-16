import React, { useContext } from 'react'
import { Row, Col, Tab } from 'react-bootstrap'
import { MarketContext } from '../../store/MarketContextProvider'
import NavItems from './menu/NavItems'
import TabItems from './menu/TabItems'

export default function AccountHome() {
    const { tradesMap } = useContext(MarketContext)

    return (
        <Tab.Container defaultActiveKey="portfolio">
            <Row>
                <Col sm={3}>
                    <NavItems tickers={tradesMap} />
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <TabItems tickers={tradesMap} />
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
