import React, { useState, useEffect, useContext } from 'react'
import { Row, Tab, Col } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from '../store/AppContextProvider'
import * as API from '../apiCalls'
import TradeActionsContainer from '../components/MarketContainer/forms/TradeActionsContainer'
import {
    validateUploadedJSON,
    seperateTradesBySecurity,
} from '../components/MarketContainer/forms/_utils'

import {
    sortTransactionsByDate,
    averagePriceForEachTransaction,
} from './api/models/transactions/_utils'

import { NavItems, TabItems } from '../components/MarketContainer/menu'

export const TradesContext = React.createContext('Trades')

const ENTITY = 'transactions'

export default function Markets() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [trades] = useState([])
    const [tradesMap, setTradesMap] = useState(null)

    const { mode } = useContext(AppContext)

    function getAccessToken() {
        return getAccessTokenSilently({
            audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
            scope: 'read:current_user',
        })
    }

    async function fetchTrades() {
        try {
            const accessToken = await getAccessToken()
            const content = await API.fetchEntity(accessToken, ENTITY)
            setTradesMap(new Map(Object.entries(content)))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (mode && isAuthenticated) {
            fetchTrades()
        } else {
            setTradesMap(null)
        }
    }, [mode, isAuthenticated])

    async function saveTradeTransaction(transaction) {
        const params = Array.isArray(transaction) ? transaction : [transaction]
        try {
            const accessToken = await getAccessToken()
            await API.save(params, accessToken, ENTITY)
            await fetchTrades()
        } catch (err) {
            console.error(err)
        }
    }

    async function deleteTradeTransaction(id) {
        try {
            const accessToken = await getAccessToken()
            await API.deleteEntity(id, accessToken, ENTITY)
            await fetchTrades()
        } catch (err) {
            console.error(err)
        }
    }

    async function updateTradeTransaction(transaction) {
        try {
            const accessToken = await getAccessToken()
            await API.update(transaction, accessToken, ENTITY)
            await fetchTrades()
        } catch (err) {
            console.error('Error from the server ', err)
        }
    }

    async function uploadCSVFile(uploadedJSON) {
        const { accepted } = validateUploadedJSON(uploadedJSON, trades)

        if (mode) {
            updateTradeTransaction(accepted)
        } else {
            const newtradesMap = seperateTradesBySecurity(accepted)
            const newMap = {}
            newtradesMap.forEach((value, key) => {
                const sortedList = sortTransactionsByDate(value)
                const listWithAvg = averagePriceForEachTransaction(sortedList)
                newMap[key] = listWithAvg
            })
            setTradesMap(newMap)
        }
    }

    const value = {
        deleteTradeTransaction,
        updateTradeTransaction,
        saveTradeTransaction,
    }

    return (
        <TradesContext.Provider value={value}>
            <Tab.Container defaultActiveKey="portfolio">
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
        </TradesContext.Provider>
    )
}
