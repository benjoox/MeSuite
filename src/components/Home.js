import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Tab, Col, Button } from 'react-bootstrap';
import TradeActionsContainer from './Transaction/TradeActionsContainer'
import { validateUploadedJSON } from './Transaction/_utils'
import MainMenu from './MainMenu'
import MainContainer from './MainContainer'
import Login from './Login'
import Logout from './Logout'

export default function Home() {
    const { isLoading, user, isAuthenticated } = useAuth0()
    const [trades, setTrades] = useState([])
    const [collapse, setCollapse] = useState(true)
    const [tradesMap, setTradesMap] = useState(null)

    useEffect(() => {
        getTransactions()
    }, [])

    async function getTransactions() {
        const response = await fetch(`/api/v1/transactions`)
        const transactions = await response.json()
        const tradesMap = new Map()
        Object.entries(transactions).map(transaction => tradesMap.set(transaction[0], transaction[1]))
        setTradesMap(tradesMap)
    }

    async function uploadCSVFile(uploadedJSON) {
        const { accepted, rejected } = validateUploadedJSON(uploadedJSON, trades)
        await fetch(`/api/v1/transactions`, {
            method: 'POST',
            body: JSON.stringify(accepted)
        })
        
        getTransactions()
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
                <Col sm={8}>
                    <TradeActionsContainer 
                        uploadCSVFile={uploadCSVFile}
                        save={save} 
                    >
                        <Button variant="success" onClick={()=> { setCollapse(!collapse) }}>
                            { collapse ? 'Show transaction list' : 'Hide transaction list' }
                        </Button> 
                    </TradeActionsContainer>
                </Col>
              
                <Col sm={2}>
                    {  isAuthenticated ? <Logout user={user} /> : <Login />    }
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

