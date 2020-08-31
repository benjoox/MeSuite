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
    function save(params) {
        try {
            Object.entries(params).map((el) => {
                if (!el[1] || el[1] === '') {
                    throw Error(`The ${el[0]} cannot be empty`)
                }
                return el
            })
            props.setError()
            props.save(params, props.action)
            props.close()
        } catch (err) {
            setError(err.message)
        }
    }

    if (!trade) return ''
    const { show, close, title } = props
    const { price, fees, type, units, code } = trade
    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? <div>Error: {error} </div> : ''}
                <TradeForm
                    price={price}
                    fees={fees}
                    type={type}
                    units={units}
                    code={code}
                    handleChange={handleChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => save(trade)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

TradeActionsModal.defaultProps = {
    title: '',
}

TradeActionsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    trade: PropTypes.object.isRequired,
}
