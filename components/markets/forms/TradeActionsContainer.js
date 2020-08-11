import React, { useState } from 'react'
import { func, object } from 'prop-types'
import { Row, Jumbotron } from 'react-bootstrap'
import TradeActionsModal from './TradeActionsModal'
import UploadButton from '../../shared/UploadButton'

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
            <Row className='justify-content-center column' style={{ margin: '1rem'}}>

                <Jumbotron>
                    <p>In the offline mode you can upload a CSV file and analyse your positions without saving any data</p>

                    <div style={{ textAlign: 'center'}}>
                        <UploadButton 
                            uploadCSVFile={props.uploadCSVFile}
                            headers={['orderNumber', 'date', 'type', 'code', 'units', 'price', 'fees', 'net']}
                        />
                    </div>
                </Jumbotron>
                
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
    selectedTrade: object,
    uploadCSVFile: func.isRequired
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