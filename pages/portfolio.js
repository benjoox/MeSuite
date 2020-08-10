import React, { useState, useEffect, useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { AppContext } from '../pages/_app'
import { Row, Tab, Col, Button } from 'react-bootstrap';
import { PortfolioContext } from '../components/portfolio/context'
import TradeActionsContainer from '../components/portfolio/Transaction/TradeActionsContainer'
import { validateUploadedJSON, seperateTradesBySecurity } from '../components/portfolio/Transaction/_utils'
import { NavItems, TabItems }  from '../components/portfolio/Menu'
import MainContainer from '../components/portfolio/MainContainer'


export default function Portfolio() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [trades, setTrades] = useState([])
    const [collapse, setCollapse] = useState(true)
    const [tradesMap, setTradesMap] = useState(null)
    const [error, setError] = useState(null)
    
    const { mode } = useContext(AppContext)

    useEffect(() => {
        if(mode) getTransactions()
        else setTradesMap(null)
    }, [mode])

    function getAccessToken() {
        return getAccessTokenSilently({
            audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
            scope: "read:current_user",
        })
    } 

    async function getTransactions() {      
        const accessToken = await getAccessToken()
        const response = await fetch(`/api/v1/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        
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
        const accessToken = await getAccessToken()
        
        await fetch(`/api/v1/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(accepted)
        })
        
        if(mode) getTransactions()
        else {
            setTradesMap(seperateTradesBySecurity(accepted))
        }
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
    
    return <Tab.Container defaultActiveKey="portfolio">
                <Row>
                    <Col>
                        <TradeActionsContainer uploadCSVFile={uploadCSVFile} />
                    </Col>
                </Row>
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
}

