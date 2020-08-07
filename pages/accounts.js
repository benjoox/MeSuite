import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Nav, Container } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react"
import AccountContainer from '../components/accounts/AccountContainer.js'
import fetch from 'isomorphic-fetch'

const API_URL=`/api/v1/accounts`

export default function Accounts(props) {
    const [key, setKey] = useState('home');
    const { isAuthenticated } = useAuth0()
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        async function getAccounts() {
            try {
                const response = await fetch(API_URL)
                const { content } = await response.json()
                console.log('the content is ', content)
                setAccounts(content)
                if(!content) return  
            } catch(err) {
                console.error('Error from the server ', err)
            }
        }
        getAccounts()
    }, [])
    useEffect(() => setKey('cbaPersonalSmart'), [props])

    if(!isAuthenticated) return <div>You are not authorised to see this page</div>
    if(accounts.length < 1) return <div>No accounts were linked to this user</div>

    const navItems = () => {
        const menu = []
        for(let k in accounts) {
            menu.push(<Nav.Item>
                <Nav.Link eventKey={k}>{k}</Nav.Link>
            </Nav.Item>
            )
        }

        return <Nav variant="pills" className="flex-column">
                { menu }
            </Nav>
    }
    const tabItems = () => {
        const menu = []
        for(let k in accounts) {
            menu.push(<Tab.Pane eventKey={k}>
                        <AccountContainer name={k} transactions={accounts[k]}/>
                    </Tab.Pane>
            )
        }

        return <Tab.Content>{ menu } </Tab.Content>
    }
    
    
    return (
        <Container style={{ padding: '20px', maxWidth: '1340px' }} >
            <Tab.Container defaultActiveKey="cbaPersonalSmart">
                <Row>
                    <Col sm={2} style={{ position: 'fixed' }} >
                        { navItems() }
                        <AddAccount />
                    </Col>
                    <Col sm={9} style={{ marginLeft: '300px' }}>
                        <Tab.Content>
                            { tabItems() }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

const AddAccount = () => {
    return <form></form>
}