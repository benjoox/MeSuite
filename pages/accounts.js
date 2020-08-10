import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Button, Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react'
import Create from '../components/accounts/forms/AccountActionsModal'
import * as API from '../apiCalls'
import { NavItems, TabItems } from '../components/accounts/menu'

export const AccountsContext = React.createContext('Accounts')

const ENTITY = 'accounts'
export default function Accounts() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [accounts, setAccounts] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => { fetchAccounts() }, [])

    function getAccessToken() {
        return getAccessTokenSilently({
            audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
            scope: "read:current_user",
        })
    } 

    async function fetchAccounts() {
        try {
            const accessToken = await getAccessToken()
            const content = await API.fetchEntity(accessToken, ENTITY)
            setAccounts(content)
        } catch(err) {
            console.error(err)
        }
    }

    async function saveAccountTransaction(account) {
        const params = Array.isArray(account) ? account : [account]
        try {
            const accessToken = await getAccessToken()
            await API.save(params, accessToken, ENTITY)
            await fetchAccounts()
        } catch(err) {
            console.error(err)
        }
    }
    
    async function deleteAccountTransaction(id) {
        try {
            const accessToken = await getAccessToken()
            await API.deleteEntity(id, accessToken, ENTITY)
            await fetchAccounts()
        } catch(err) {
            console.error(err)
        }
    }

    async function updateAccountTransaction(transaction) {
        try {
            const accessToken = await getAccessToken()
            await API.update(transaction, accessToken, ENTITY)
            await fetchAccounts()
            if(!content) return  
        } catch(err) {
            console.error('Error from the server ', err)
        }
    }

    if(!isAuthenticated) return <div>You are not authorised to see this page</div>
    if(accounts.length < 1) return <div>No accounts were linked to this user</div>
    
    const value = { 
        deleteAccountTransaction,
        updateAccountTransaction,
        saveAccountTransaction
    }

    return (
        <AccountsContext.Provider value={value} >
            <Container fluid>
                <Tab.Container defaultActiveKey="cbaPersonalSmart">
                    <Row>
                        <Col sm={3}>
                            <NavItems accounts={accounts} />
                            <Button onClick={() => setShow(true)} >
                                    Create
                            </Button>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <TabItems accounts={accounts} />
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <Create 
                    close={() => setShow(false)} 
                    show={show} 
                    save={saveAccountTransaction} 
                />
            </Container>
        </AccountsContext.Provider>
    )
}