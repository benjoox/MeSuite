import React, { useState } from 'react'
import { Container, Row, Tab, Col, Button } from 'react-bootstrap';
import TradeActionsContainer from './Transaction/TradeActionsContainer'
import {
    validateUploadedJSON , 
    seperateTradesByTickers,
    seperateTradesByDate 
} from './Transaction/_utils'
import MainMenu from './MainMenu'
import MainContainer from './MainContainer'


export default function Home() {
    const [trades, setTrades] = useState([])
    const [collapse, setCollapse] = useState(true)
    const [tradesMap, setTradesMap] = useState(null)

    function uploadCSVFile(uploadedJSON) {
        const { accepted, rejected } = validateUploadedJSON(uploadedJSON, trades)
        
        setTrades(accepted)
        const tradesMap = seperateTradesByTickers(accepted)
        const tradesMapByDate = seperateTradesByDate(accepted)
        setTradesMap(tradesMap)
      } 


    function save(trade, action) {
        switch(action) {
            case('add'): 
                add(trade)
            break
            case('edit'):
            case('remove'): 
                const found = trades.find(el => el.id === trade.id)
            break
            if(!found) {
                setError(`The trade with id ${trade.id} does not exist`)
                return
            }
            // TODO 
            console.log('TODO :: saving the details af a transaction ')
            break
            default:
            break
        }
    }
    
    return (
        <Container fluid style={{ padding: '2rem' }}>
            <Row>
                <Col sm={2}>
                    <h1>MePortfolio</h1>
                </Col>
                <Col sm={10}>
                    <TradeActionsContainer 
                        uploadCSVFile={uploadCSVFile}
                        save={save} 
                    >
                        <Button variant="success" onClick={()=> { setCollapse(!collapse) }}>
                            { collapse ? 'Show transaction list' : 'Hide transaction list' }
                        </Button> 
                    </TradeActionsContainer>
                </Col>
            </Row>
            <Tab.Container defaultActiveKey="portfolio">
                <Row>
                    <MainMenu tickers={tradesMap ? Array.from(tradesMap.keys()) : []}/>
                    <MainContainer trades={trades} tradesMap={tradesMap}/>
                </Row>
            </Tab.Container>
        </Container>
    )
}

