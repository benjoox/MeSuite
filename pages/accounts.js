import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Button, Container } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react"
import Create from '../components/accounts/crud/Create'
import { fetchAccounts, saveAccountTransaction } from '../apiCalls/accounts'
import { NavItems, TabItems } from '../components/accounts/menu'

export default function Accounts(props) {
    const [key, setKey] = useState('home');
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [accounts, setAccounts] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => { getAccounts() }, [])
    useEffect(() => setKey('cbaPersonalSmart'), [props])

    function getAccessToken() {
        return getAccessTokenSilently({
            audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
            scope: "read:current_user",
        })
    } 

    async function getAccounts() {
        try {
            const accessToken = await getAccessToken()
            const content = await fetchAccounts(accessToken)
            setAccounts(content)
        } catch(err) {
            console.error(err)
        }
    }

    async function save(account) {
        try {
            const accessToken = await getAccessToken()
            await saveAccountTransaction(account, accessToken)
            await getAccounts()
        } catch(err) {
            console.error('Error from the server ', err)
        }
    }

    if(!isAuthenticated) return <div>You are not authorised to see this page</div>
    if(accounts.length < 1) return <div>No accounts were linked to this user</div>
    
    return (
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
                save={save} 
            />
        </Container>
    )
}