import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Modal, Button } from 'react-bootstrap'
import AccountTransactionForm from './AccountTransactionForm'

const timestamp = (datetime, dateFormat='YYYY-MM-DDTHH:mm:ss', zone='AUSTRALIA/MELBOURNE') => {
  console.log('datetime ', datetime)
  return moment(datetime, dateFormat).tz(zone).unix()
}

export default function AccountActionsModal(props) {
  const [account, setAccount] = useState({
    name: '',
    amount: 0,
    description: '',
    category: ''
  })
  const [error, setError] = useState()
 
  function handleChange(ev) {
      ev.preventDefault()
      setAccount({ ...account, [ev.target.id]: ev.target.value })
  }   
  
  function updateDate(date) {
    setAccount({ ...account, date })
  }

  function save() {  
      for(var key in account) {
        if(!account[key] || account[key] === '') {
          setError(`The ${key} cannot be empty`)
          return
        } 
      }
      setError()
      props.save({ 
        ...account, 
        account: account.name,
        date: timestamp(account.date)
      })
      props.close()
  }

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Add an account transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { error ? <div>Error: {error} </div> : '' }
        <AccountTransactionForm 
          handleChange={handleChange}  
          updateDate={updateDate}
          account={account}
          close={props.close}
          save={props.save}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button variant="primary" onClick={() => save(account)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

AccountActionsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string
}