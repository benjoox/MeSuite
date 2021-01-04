import React, { useContext } from 'react'
import { Row, Col, Tab, Container } from 'react-bootstrap'
import { AccountsContext } from '../../store/AccountContextProvider'
import FilterContextProvider from '../../store/FilterContextProvider'
import NavItems from './NavItems'
import AccountContainer from './AccountContainer'
import Spinner from '../shared/Spinner'
import MainTaglist from './taglist/MainTaglist'

const container = {
    marginTop: '24px',
    marginBottom: '24px',
}

export default function AccountPage() {
    const {
        accounts,
        accountsAvailable,
        loading,
        selectedAccount,
        selectAccount,
    } = useContext(AccountsContext)

    if (loading) return <Spinner />

    const isAccountSelected = () =>
        accountsAvailable && selectedAccount.name !== ''
    return (
        <FilterContextProvider primaryList={selectedAccount}>
            <Container fluid style={container}>
                {accountsAvailable ? (
                    <div style={{ marginTop: '35px' }}>
                        <Tab.Container
                            activeKey={selectedAccount.name}
                            onSelect={selectAccount}
                        >
                            <Row>
                                <Col sm={3}>
                                    <NavItems accounts={accounts} />
                                    {isAccountSelected() ? <MainTaglist /> : ''}
                                </Col>
                                {isAccountSelected() ? (
                                    <>
                                        <Col sm={9}>
                                            <AccountContainer />
                                        </Col>
                                    </>
                                ) : (
                                    ''
                                )}
                            </Row>
                        </Tab.Container>
                    </div>
                ) : (
                    ''
                )}
            </Container>
        </FilterContextProvider>
    )
}
