import React, { useContext } from 'react'
import { Row, Col, Tab, Container } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from '../../../store/AppContextProvider'
import { AccountsContext } from '../../../store/AccountContextProvider'
import EmptyAccountJumbotron from '../forms/EmptyAccountJumbotron'
import NavItems from './NavItems'
import TabItems from './TabItems'

const container = {
    marginTop: '24px',
    marginBottom: '24px',
}

export default function AccountMenu() {
    const { isAuthenticated } = useAuth0()
    const { mode } = useContext(AppContext)
    const { accounts } = useContext(AccountsContext)

    return (
        <Container fluid style={container}>
            {!mode || !isAuthenticated ? (
                <EmptyAccountJumbotron message="In the offline mode you can upload a CSV file and analyse your account without saving any data" />
            ) : (
                ''
            )}

            {mode && isAuthenticated && accounts.length < 1 ? (
                <EmptyAccountJumbotron message="There are no accounts attached to this user. Import your account by uploading a CSV file" />
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
