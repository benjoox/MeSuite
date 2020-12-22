import React, { useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ReactCSVUploadTest from 'react-csv-upload-test'
import Filter from '../Filters'
import Transactions from './Transactions'
import { AccountsContext } from '../../store/AccountContextProvider'

export default function AccountContainer({ transactions, name }) {
    const {
        uploadAccountTransactionFile,
        deleteAccount,
        selectedAccount,
    } = useContext(AccountsContext)

    if (!selectedAccount) return ''
    return (
        <Container>
            <Row>
                <div style={{ position: 'absolute', right: 0 }}>
                    <Button variant="dark" onClick={() => deleteAccount()}>
                        Delete Account
                    </Button>
                </div>
            </Row>

            <Filter />
            <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <Row>
                    <Col md={4}>
                        {' '}
                        The number of transactions are {
                            transactions.length
                        }{' '}
                    </Col>

                    <Col md={4}>
                        <ReactCSVUploadTest
                            handleFile={(data) =>
                                uploadAccountTransactionFile(data, name)
                            }
                            headers={[
                                'date',
                                'amount',
                                'description',
                                'balance',
                                'category',
                            ]}
                        />
                    </Col>
                </Row>
            </div>
            <Transactions />
        </Container>
    )
}
