import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import TradeActionsModal from '../forms/TradeActionsModal'

const sampleTrade = {
    ticker: '',
    type: '',
    units: 0,
    price: 2.04,
    date: '22/04/2020',
    fees: 19.95,
}

export default function AddWithModal(props) {
    const [modalState, setModalState] = useState(false)
    const [title, setModalTitle] = useState('Add')
    const [action, setAction] = useState('add')
    const [error, setError] = useState(null)

    function save() {
        // TODO: To be implemented
    }

    // eslint-disable-next-line no-shadow
    function openModal(action) {
        setError(false)
        // A trade without an id is a new trade
        if (action === 'edit' && !props.selectedTrade) {
            setError('Select a trade to edit')
            return
        }
        if (action === 'remove' && !props.selectedTrade) {
            setError('Select a trade to remove')
            return
        }

        setModalState(true)
        setModalTitle(action)
        setAction(action)
    }

    function closeModal() {
        setModalState(false)
    }

    const { selectedTrade } = props
    return (
        <>
            {error ? `Error ${error}` : ''}
            <Row
                className="justify-content-center"
                style={{ marginBottom: '1rem' }}
            >
                <Col>
                    <Button variant="dark" onClick={() => openModal('add')}>
                        Add
                    </Button>
                </Col>
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
