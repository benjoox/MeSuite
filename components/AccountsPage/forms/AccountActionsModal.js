import React, { useState } from 'react'
import { bool, func } from 'prop-types'
import moment from 'moment-timezone'
import { Modal, Button } from 'react-bootstrap'
import AccountTransactionForm from './AccountTransactionForm'

const timestamp = (
    datetime,
    dateFormat = 'YYYY-MM-DDTHH:mm:ss',
    zone = 'AUSTRALIA/MELBOURNE'
) => {
    return moment(datetime, dateFormat).tz(zone).unix()
}

export default function AccountActionsModal({ show, close, save }) {
    const [account, setAccount] = useState({
        name: '',
        amount: 0,
        description: '',
        category: '',
    })
    const [error, setError] = useState()

    function handleChange(ev) {
        ev.preventDefault()
        setAccount({ ...account, [ev.target.id]: ev.target.value })
    }

    function updateDate(date) {
        setAccount({ ...account, date })
    }

    function handleClick() {
        try {
            Object.entries(account).map((el) => {
                if (!el[0] || el[1] === '') {
                    throw Error(`The ${el[0]} cannot be empty`)
                }
                return true
            })
        } catch (err) {
            setError(err)
        }
        setError()
        save({
            ...account,
            account: account.name,
            date: timestamp(account.date),
        })
        close()
    }

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Add an account transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? <div>Error: {error} </div> : ''}
                <AccountTransactionForm
                    handleChange={handleChange}
                    updateDate={updateDate}
                    account={account}
                    close={close}
                    save={save}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleClick(account)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

AccountActionsModal.propTypes = {
    show: bool.isRequired,
    close: func.isRequired,
}
