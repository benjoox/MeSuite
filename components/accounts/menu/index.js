import React, { useContext } from 'react'
import { Row, Col, Tab, Container } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from '../../../store/AppContextProvider'
import { AccountsContext } from '../../../store/AccountContextProvider'
import AccountOfflineForm from '../forms/AccountOfflineForm'
import NavItems from './NavItems'
import TabItems from './TabItems'

export default function AccountMenu() {
    const { isAuthenticated } = useAuth0()
    const { mode } = useContext(AppContext)
    const { accounts } = useContext(AccountsContext)

    return (
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
    )
}
