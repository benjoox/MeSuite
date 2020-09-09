import React, { useContext } from 'react'
import { Row, Jumbotron, Col } from 'react-bootstrap'
import { AccountsContext } from '../../../../store/AccountContextProvider'
import UploadButton from '../../../shared/UploadButton'

export default function EmptyAccountNotification({ message }) {
    const { addAccountAndSave, accountsAvailable } = useContext(AccountsContext)

    return (
        <>
            {accountsAvailable ? (
                <Row
                    style={{
                        margin: '1rem',
                        padding: '1rem',
                        backgroundColor: '#e9ecef',
                    }}
                >
                    <Col sm={10}>
                        <p> {message} </p>
                    </Col>
                    <Col sm={2}>
                        <UploadButton
                            uploadCSVFile={addAccountAndSave}
                            headers={[
                                'date',
                                'amount',
                                'description',
                                'balance',
                                'category',
                            ]}
                            timestamped
                        >
                            Upload transactions
                        </UploadButton>
                    </Col>
                </Row>
            ) : (
                <Row
                    className="justify-content-center column"
                    style={{ margin: '1rem' }}
                >
                    <Jumbotron style={{ textAlign: 'center' }}>
                        <p style={{ height: '90px' }}> {message} </p>

                        <div>
                            <UploadButton
                                uploadCSVFile={addAccountAndSave}
                                headers={[
                                    'date',
                                    'amount',
                                    'description',
                                    'balance',
                                    'category',
                                ]}
                                timestamped
                            >
                                Upload transactions
                            </UploadButton>
                        </div>
                    </Jumbotron>
                </Row>
            )}
        </>
    )
}
