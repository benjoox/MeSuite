import React, { useContext } from 'react'
import { Row, Jumbotron } from 'react-bootstrap'
import { AccountsContext } from '../../../store/AccountContextProvider'
import UploadButton from '../../shared/UploadButton'

export default function AccountOfflineForm() {
    const { addAccountAndSave } = useContext(AccountsContext)
    return (
        <Row
            className="justify-content-center column"
            style={{ margin: '1rem' }}
        >
            <Jumbotron>
                <p>
                    In the offline mode you can upload a CSV file and analyse
                    your account without saving any data
                </p>

                <div style={{ textAlign: 'center' }}>
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
    )
}
