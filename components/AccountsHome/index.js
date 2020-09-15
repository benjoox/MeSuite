import React, { useContext } from 'react'
import { Row, Col, Tab, Container } from 'react-bootstrap'
import { AccountsContext } from '../../store/AccountContextProvider'
import NavItems from './menu/NavItems'
import TabItems from './menu/TabItems'

const container = {
    marginTop: '24px',
    marginBottom: '24px',
}

export default function AccountHome() {
    const { accounts } = useContext(AccountsContext)

    return (
        <Container fluid style={container}>
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
