import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Row } from 'react-bootstrap'
import TradeActionsModal from './TradeActionsModal'

export default function TradeActionsContainer(props) {
    const [modalState, setModalState] = useState(false)
    const [title, setModalTitle] = useState('Add')
    const [action, setAction] = useState('add')
    const [error, setError] = useState(null)

    function openModal(action) {
        setError(false)
        // A trade without an id is a new trade
        if(action === 'edit' && !props.selectedTrade) {
            setError('Select a trade to edit')
            return
        }
        if(action === 'remove' && !props.selectedTrade ) {
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

    return (
        <>
            { error ? `Error ${error}` : ''}
            <Row className="justify-content-around">
                
                <>
                <Button variant="dark" onClick={() => openModal('add')}>Add</Button>
                <Button variant="outline-dark" onClick={() => openModal('edit')}>Edit</Button>
                <Button variant="outline-dark" onClick={() => openModal('remove')}>Remove</Button>
                {props.children}
                </>
                <TradeActionsModal 
                    show={modalState}
                    close={() => closeModal()}
                    save={props.save}
                    title={title}
                    trade={action === 'add' ? sampleTrade : props.selectedTrade}
                    action={action}
                />
            </Row>
        </>
    )
}   

TradeActionsContainer.propTypes = {
    selectedTrade: PropTypes.obj
}

const sampleTrade = {
    code: '',
    type: '',
    units: 0,
    type: '',
    price: 2.04,
    date: "22/04/2020",
    fees: 19.95,
}