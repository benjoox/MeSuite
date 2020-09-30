import React, { useState } from 'react'
import { func, object } from 'prop-types'
import { Row, Jumbotron } from 'react-bootstrap'
import ReactCSVUploadTest from 'react-csv-upload-test'
import TradeActionsModal from './TradeActionsModal'

const sampleTrade = {
    code: '',
    type: '',
    units: 0,
    price: 2.04,
    date: '22/04/2020',
    fees: 19.95,
}

export default function TradeActionsContainer(props) {
    const [modalState, setModalState] = useState(false)
    const [title] = useState('Add')
    const [action] = useState('add')
    const [error] = useState(null)

    function closeModal() {
        setModalState(false)
    }

    const { uploadCSVFile, save, selectedTrade } = props
    return (
        <>
            {error ? `Error ${error}` : ''}
            <Row
                className="justify-content-center column"
                style={{ margin: '1rem' }}
            >
                <Jumbotron>
                    <p>
                        In the offline mode you can upload a CSV file and
                        analyse your positions without saving any data
                    </p>

                    <div style={{ textAlign: 'center' }}>
                        <ReactCSVUploadTest
                            handleFile={uploadCSVFile}
                            headers={[
                                'orderNumber',
                                'date',
                                'type',
                                'code',
                                'units',
                                'price',
                                'fees',
                                'net',
                            ]}
                        />
                    </div>
                </Jumbotron>
            </Row>
            <TradeActionsModal
                show={modalState}
                close={() => closeModal()}
                save={save}
                title={title}
                trade={action === 'add' ? sampleTrade : selectedTrade}
                action={action}
            />
        </>
    )
}

TradeActionsContainer.defaultProps = {
    selectedTrade: {},
}

TradeActionsContainer.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    selectedTrade: object,
    uploadCSVFile: func.isRequired,
}
