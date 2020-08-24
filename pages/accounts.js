import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Tab, Container } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from './_app'
import * as API from '../apiCalls'
import { NavItems, TabItems } from '../components/accounts/menu'
import AccountOfflineForm from '../components/accounts/forms/AccountOfflineForm'

export const AccountsContext = React.createContext('Accounts')

const isEmpty = (obj) =>
    Object.keys(obj).length === 0 && obj.constructor === Object

const ENTITY = 'accounts'
export default function Accounts() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [accounts, setAccounts] = useState([])
    const { mode } = useContext(AppContext)

    useEffect(() => {
        if (mode && isAuthenticated) {
            fetchAccounts()
        } else {
            setAccounts([])
        }
    }, [])

    function getAccessToken() {
        return getAccessTokenSilently({
            audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
            scope: 'read:current_user',
        })
    }

    async function fetchAccounts() {
        try {
            const accessToken = await getAccessToken()
            const content = await API.fetchEntity(accessToken, ENTITY)

            setAccounts(isEmpty(content) ? [] : content)
        } catch (err) {
            console.error(err)
        }
    }

    async function saveAccountTransaction(account) {
        const params = Array.isArray(account) ? account : [account]
        try {
            const accessToken = await getAccessToken()
            await API.save(params, accessToken, ENTITY)
            await fetchAccounts()
        } catch (err) {
            console.error(err)
        }
    }

    async function deleteAccountTransaction(id) {
        try {
            const accessToken = await getAccessToken()
            await API.deleteEntity(id, accessToken, ENTITY)
            await fetchAccounts()
        } catch (err) {
            console.error(err)
        }
    }

    async function updateAccountTransaction(transaction) {
        try {
            const accessToken = await getAccessToken()
            await API.update(transaction, accessToken, ENTITY)
            await fetchAccounts()
            if (!content) return
        } catch (err) {
            console.error(err)
        }
    }

    const addAccountAndSave = (transactions, account = 'Temp account') => {
        if (mode && isAuthenticated) {
            const transactionWithAccount = transactions.map((el) => ({
                ...el,
                account,
            }))
            saveAccountTransaction(transactionWithAccount)
        } else {
            setAccounts({ [account]: transactions })
        }
    }

    const value = {
        deleteAccountTransaction,
        updateAccountTransaction,
        saveAccountTransaction,
        addAccountAndSave,
    }

    return (
        <AccountsContext.Provider value={value}>
            <Container fluid>
                {(!mode || !isAuthenticated) && accounts.length < 1 ? (
                    <AccountOfflineForm />
                ) : (
                    ''
                )}
                <div style={{ marginTop: '35px' }}>
                    <Tab.Container defaultActiveKey="Temp account">
                        <Row>
                            <Col sm={3}>
                                <NavItems accounts={accounts} />
                            </Col>
                            <Col sm={9}>
                                <TabItems accounts={accounts} />
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </Container>
        </AccountsContext.Provider>
    )
}
