import React from 'react'
import { FormGroup, Form, Row, Col } from 'react-bootstrap'

import TextField from './TextField'
import DateFields from './DateFields'

const label = {
    fontSize: '1rem',
    marginBottom: '0.5rem',
}

export default function Filters(props) {
    const {
        startDate,
        endDate,
        setIncludingText,
        setExcludingText,
        updateFilterField,
        updateStartDate,
        updateEndDate,
        filterField,
        includingText,
        excludingText,
    } = props

    function onSelect(ev) {
        ev.preventDefault()
        updateFilterField(ev.target.value)
    }
    function onTextChange(ev) {
        ev.preventDefault()
        if (ev.target.id === 'include') {
            setIncludingText(ev.target.value)
        } else if (ev.target.id === 'exclude') {
            setExcludingText(ev.target.value)
        }
    }

    return (
        <>
            <Row>
                <DateFields
                    startDate={startDate}
                    endDate={endDate}
                    updateStartDate={updateStartDate}
                    updateEndDate={updateEndDate}
                />
            </Row>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <p style={label}>Choose a field</p>
                        <Form.Control
                            as="select"
                            size="md"
                            onChange={onSelect}
                            value={filterField}
                        >
                            <option value="">-- All --</option>
                            <option value="amount">Amount</option>
                            <option value="category">Category</option>
                            <option value="account">Account</option>
                            <option value="description">Description</option>
                        </Form.Control>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <p style={label}>Include</p>
                    <TextField
                        searchText={includingText}
                        onTextChange={onTextChange}
                        id="include"
                    />
                </Col>
                <Col md={3}>
                    <p style={label}>Exclude</p>
                    <TextField
                        searchText={excludingText}
                        onTextChange={onTextChange}
                        id="exclude"
                    />
                </Col>
            </Row>
        </>
    )
}
