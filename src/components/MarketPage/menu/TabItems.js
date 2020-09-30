import React from 'react'
import { Tab } from 'react-bootstrap'
import Security from '../Security'
import Portfolio from '../Portfolio'

const TabItems = ({ tickers }) => {
    const items = []
    if (!tickers) return ''
    Object.entries(tickers).map((el) => {
        items.push(
            <Tab.Pane key={Math.random() * 1000} eventKey={el[0]}>
                <Security trades={el[1]} ticker={el[0]} />
            </Tab.Pane>
        )
        return items
    })

    return (
        <Tab.Content>
            <Tab.Pane key="portfolio" eventKey="portfolio">
                <Portfolio tradesMap={tickers} />
            </Tab.Pane>
            {items}
        </Tab.Content>
    )
}

export default TabItems
