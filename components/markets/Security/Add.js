import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'react-bootstrap'
import TradeActionsModal from '../Transaction/TradeActionsModal'
import UploadButton from '../UIElements/UploadButton'
import SecurityContext from './Context'

export default function AddWithModal(props) {
    const [modalState, setModalState] = useState(false)
    const [title, setModalTitle] = useState('Add')
    const [action, setAction] = useState('add')
    const [error, setError] = useState(null)
    const context = useContext(SecurityContext)
    const [] = useState()

    function save (param1, param2) {
        console.log('save the form ', param1)
        console.log('param2 ', param2)
        console.log('context ', context)
    }
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
            <Row className="justify-content-center" style={{ marginBottom: '1rem'}}>
            
                <Col>
                    <Button variant="dark" onClick={() => openModal('add')}>Add</Button>
                </Col>
            </Row>
            <TradeActionsModal 
                show={modalState}
                close={() => closeModal()}
                save={save}
                title={title}
                trade={action === 'add' ? sampleTrade : props.selectedTrade}
                action={action}
            />
        </>
    )
}   

AddWithModal.propTypes = {
    selectedTrade: PropTypes.object
}

const sampleTrade = {
    ticker: '',
    type: '',
    units: 0,
    type: '',
    price: 2.04,
    date: "22/04/2020",
    fees: 19.95,
}

