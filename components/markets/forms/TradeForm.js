import React from 'react'
import Proptypes from 'prop-types'
import { Col, Form, Row } from 'react-bootstrap'

export default function TradeForm(props) {
    const { handleChange, code, type, units, price, fees } = props
    return (
        <Form>
            <Form.Group>
                <Form.Label>Security Code</Form.Label>
                <Form.Control
                    id="code"
                    as="select"
                    onChange={handleChange}
                    value={code.toLowerCase()}
                >
                    <option value="" />
                    <option value="cba">CBA</option>
                    <option value="scg">SCG</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Trade type</Form.Label>
                <Form.Control
                    as="select"
                    id="type"
                    onChange={handleChange}
                    value={type.toLowerCase()}
                >
                    <option value="" />
                    <option value="b">Buy</option>
                    <option value="s">Sell</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Units of shares</Form.Label>
                <Form.Control
                    as="input"
                    type="number"
                    placeholder="0"
                    name="units"
                    id="units"
                    value={units}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Price per share</Form.Label>
                <Form.Control
                    as="input"
                    type="number"
                    placeholder="0"
                    name="price"
                    id="price"
                    value={price}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Fees</Form.Label>
                <Form.Control
                    as="input"
                    type="number"
                    placeholder="0"
                    name="fees"
                    id="fees"
                    value={fees}
                    onChange={handleChange}
                />
            </Form.Group>
            <Row>
                <Col>Total: {parseFloat(units) * parseFloat(price)}</Col>
            </Row>
        </Form>
    )
}

TradeForm.propTypes = {
    price: Proptypes.number.isRequired,
    fees: Proptypes.number.isRequired,
    type: Proptypes.string.isRequired,
    units: Proptypes.number.isRequired,
    code: Proptypes.string.isRequired,
}
