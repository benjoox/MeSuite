import React from 'react'
import { Tab } from 'react-bootstrap';
import Security from '../Security'
import Portfolio from '../Portfolio'

const TabItems = ({ tickers }) => {
    const items = []
    if(!tickers ) return ''
    tickers.forEach((val, key) => {
        items.push(<Tab.Pane key={key} eventKey={key} >
            <Security trades={val} ticker={key}/>
        </Tab.Pane>)
    })
    
    return <Tab.Content>
            <Tab.Pane key='portfolio' eventKey="portfolio">
                <Portfolio tradesMap={tickers} />
            </Tab.Pane>
            { items }
         </Tab.Content>
}

export default TabItems