import React, { useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ReactCSVUploadTest from 'react-csv-upload-test'
import Filter from '../Filters'
import Transactions from './Transactions'
import { AccountsContext } from '../../store/AccountContextProvider'
import { FilterContext } from '../../store/FilterContextProvider'

export default function AccountContainer() {
    const {
        uploadAccountTransactionFile,
        deleteAccount,
        selectedAccount,
    } = useContext(AccountsContext)

    const { filteredList } = useContext(FilterContext)

    if (!selectedAccount) return ''
    const { name } = selectedAccount

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
                        {filteredList
                            ? `The number of transactions are ${filteredList.length}`
                            : 'Select an account'}
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
