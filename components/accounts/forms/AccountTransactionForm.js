import React from 'react'
import { string, number, func } from 'prop-types'
import { Form, InputGroup } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

export default function AccountTransactionForm(props) {
    const { account, handleChange, updateDate } = props
    const { date, amount, category, description, name } = account
    return (
        <Form>
            <Form.Group>
                <Form.Label>Account name</Form.Label>
                <Form.Control
                    as="input"
                    type="text"
                    placeholder="Account name"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="input"
                    type="text"
                    name="description"
                    placeholder="Description"
                    id="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    as="input"
                    type="text"
                    name="category"
                    placeholder="Category"
                    id="category"
                    value={category}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    as="input"
                    type="number"
                    placeholder="0"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <InputGroup className="mb-3" size="md">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Date</InputGroup.Text>
                        <DatePicker
                            selected={date}
                            onChange={updateDate}
                            dateFormat="dd/MM/yyyy"
                            selectsStart
                        />
                    </InputGroup.Prepend>
                </InputGroup>
            </Form.Group>
        </Form>
    )
}

AccountTransactionForm.defaultProps = {
    account: '',
    description: '',
    date: '',
    amount: 0,
    category: '',
}

AccountTransactionForm.propTypes = {
    account: string,
    description: string,
    date: string,
    amount: number,
    category: string,
    handleChange: func.isRequired,
    updateDate: func.isRequired,
}
