import React, { useState, useEffect } from 'react'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import { Container, Row, Tab, Col, Button } from 'react-bootstrap';
import TradeActionsContainer from '../src/components/Transaction/TradeActionsContainer'
import { validateUploadedJSON } from '../src/components/Transaction/_utils'
import MainMenu from '../src/components/MainMenu'
import MainContainer from '../src/components/MainContainer'

export default function Portfolio() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    if(!isAuthenticated) return <div>You are not authorised to see this page</div>
    const [trades, setTrades] = useState([])
    const [collapse, setCollapse] = useState(true)
    const [tradesMap, setTradesMap] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getTransactions()
    }, [])

    async function getTransactions() {
        const accessToken = await getAccessTokenSilently({
            audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
            scope: "read:current_user",
        })
        console.log('The access token returned from the Auth0 is ', accessToken)
        const response = await fetch(`/api/v1/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        
        console.log('the status of the response from the call to the transactions endpoint with the user accesstoken is ', status)
        if(response.status === 200) {
            const transactions = await response.json()
            const tradesMap = new Map()
            Object.entries(transactions).map(transaction => tradesMap.set(transaction[0], transaction[1]))
            setTradesMap(tradesMap)
        } else {
            if(response.status === 401) {
                console.error('Unauthorised user')
                setError('User is not authorised to access the requested endpoint')
            }
        }
        
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

