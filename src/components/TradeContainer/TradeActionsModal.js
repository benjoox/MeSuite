import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import TradeForm from './TradeForm'


export default function TradeActionsModal(props) {
  const [trade, setTrade] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    setTrade(props.trade)
  }, [props])

  function handleChange(ev) {
      ev.preventDefault()
      setTrade({ ...trade, [ev.target.id]: ev.target.value })
  }   
  function save(trade) {  
      for(var key in trade) {
        if(!trade[key] || trade[key] === '') {
          setError(`The ${key} cannot be empty`)
          return
        } 
      }
      setError()
      props.save(trade, props.action)
      props.close()
  }

  if(!trade) return '' 
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>{ props.title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { error ? <div>Error: {error} </div> : '' }
        <TradeForm 
          {...trade} 
          handleChange={handleChange}  
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button variant="primary" onClick={() => save(trade)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

TradeActionsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  trade: PropTypes.object.isRequired
}