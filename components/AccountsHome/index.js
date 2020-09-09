import React, { useContext } from 'react'
import { Row, Col, Tab, Container } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from '../../store/AppContextProvider'
import { AccountsContext } from '../../store/AccountContextProvider'
import EmptyAccountNotification from './forms/EmptyAccountNotification'
import NavItems from './menu/NavItems'
import TabItems from './menu/TabItems'

const container = {
    marginTop: '24px',
    marginBottom: '24px',
}

export default function AccountHome() {
    const { isAuthenticated } = useAuth0()
    const { modeIsOnline } = useContext(AppContext)
    const { accounts } = useContext(AccountsContext)
    let message = null

    if (isAuthenticated) {
        if (!modeIsOnline && accounts.length < 1) {
            return (
                <EmptyAccountNotification message="Import your first account and explore it in offline mode. Nothing will be saved and you will use your work if you refresh" />
            )
        }
        if (modeIsOnline && accounts.length < 1) {
            return (
                <EmptyAccountNotification message="Upload a CSV file. We will save it for you." />
            )
        }
        if (!modeIsOnline) {
            message = 'Upload another account. You will loose this page.'
        } else {
            message = 'Add a new account.'
        }
    } else {
        if (!modeIsOnline && accounts.length < 1) {
            return (
                <EmptyAccountNotification message="Upload your account and explore your data without saving them. Login and change to online mode to save your data." />
            )
        }
        if (modeIsOnline && accounts.length < 1) {
            return (
                <EmptyAccountNotification message="Import an account and explore it without saving any data. Login to save your data." />
            )
        }
        if (!modeIsOnline) {
            message = 'Upload another account. You will loose this page.'
        } else {
            message =
                'Upload a new account to explore them without saving or login to save your data.'
        }
    }

    return (
        <Container fluid style={container}>
            {message ? <EmptyAccountNotification message={message} /> : ''}
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
