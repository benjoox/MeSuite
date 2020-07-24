import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'react-bootstrap'
import TradeActionsModal from './TradeActionsModal'
import UploadButton from '../UIElements/UploadButton'
import DataMode from './DataMode'

export default function TradeActionsContainer(props) {
    const [modalState, setModalState] = useState(false)
    const [title, setModalTitle] = useState('Add')
    const [action, setAction] = useState('add')
    const [error, setError] = useState(null)

    const [] = useState()

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
                    {props.children}
                    <Button variant="dark" onClick={() => openModal('add')}>Add</Button>
                    <Button variant="outline-dark" onClick={() => openModal('edit')}>Edit</Button>
                    <Button variant="outline-dark" onClick={() => openModal('remove')}>Remove</Button>
                    <UploadButton uploadCSVFile={props.uploadCSVFile}/>
                    <div style={dataModeStyle}>
                        <DataMode />
                    </div>
                </Col>
            </Row>
            <TradeActionsModal 
                show={modalState}
                close={() => closeModal()}
                save={props.save}
                title={title}
                trade={action === 'add' ? sampleTrade : props.selectedTrade}
                action={action}
            />
        </>
    )
}   

TradeActionsContainer.propTypes = {
    selectedTrade: PropTypes.object
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

const dataModeStyle = { 
    display: 'inline-block', 
    float: 'right'
}