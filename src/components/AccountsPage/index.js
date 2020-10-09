import React, { useContext } from 'react'
import { Row, Col, Tab, Container } from 'react-bootstrap'
import { AccountsContext } from '../../store/AccountContextProvider'
import NavItems from './menu/NavItems'
import TabItems from './menu/TabItems'
import Spinner from '../shared/Spinner'

const container = {
    marginTop: '24px',
    marginBottom: '24px',
}

export default function AccountPage() {
    const {
        accounts,
        accountsAvailable,
        loading,
        selectedAccountName,
        selectAccount,
    } = useContext(AccountsContext)

    if (loading) return <Spinner />
    return (
        <Container fluid style={container}>
            {accountsAvailable ? (
                <div style={{ marginTop: '35px' }}>
                    <Tab.Container
                        activeKey={selectedAccountName}
                        onSelect={selectAccount}
                    >
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
            ) : (
                ''
            )}
        </Container>
    )
}
