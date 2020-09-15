import React, { useContext } from 'react'
import { Row, Tab, Col } from 'react-bootstrap'
import { MarketContext } from '../store/MarketContextProvider'

import { NavItems, TabItems } from '../components/MarketContainer/menu'

export const TradesContext = React.createContext('Trades')

export default function Markets() {
    const { uploadCSVFile, tradesMap, ...rest } = useContext(MarketContext)

    return (
        <MarketContext.Provider value={rest}>
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
        </MarketContext.Provider>
    )
}
