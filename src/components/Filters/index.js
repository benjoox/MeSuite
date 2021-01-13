import React, { useContext } from 'react'
import { FormGroup, Form, Row, Col, Button } from 'react-bootstrap'
import { FilterContext } from '../../store/FilterContextProvider'
import TextField from './TextField'
import DateFields from './DateFields'
import { datetimeObject } from '../../__utils'

const label = {
    fontSize: '1rem',
    marginBottom: '0.5rem',
}
const button = {
    margin: '5px',
}

export default function Filters() {
    const {
        startDate,
        endDate,
        setIncludingText,
        setExcludingText,
        setFilterField,
        setStartDate,
        setEndDate,
        filterField,
        includingText,
        excludingText,
    } = useContext(FilterContext)

    function onSelect(ev) {
        ev.preventDefault()
        setFilterField(ev.target.value)
    }
    function onTextChange(ev) {
        ev.preventDefault()
        if (ev.target.id === 'include') {
            setIncludingText(ev.target.value)
        } else if (ev.target.id === 'exclude') {
            setExcludingText(ev.target.value)
        }
    }

    const FY_17_18 = 'FY_17_18'
    const FY_18_19 = 'FY_18_19'
    const FY_19_20 = 'FY_19_20'
    const FY_20_21 = 'FY_20_21'

    const setPeriods = (period) => {
        switch (period) {
            case FY_17_18:
                setStartDate(
                    datetimeObject('01/07/2017 00:00:00', 'DD/MM/YYYY hh:mm:ss')
                )
                setEndDate(
                    datetimeObject('30/06/2018 23:59:59', 'DD/MM/YYYY hh:mm:ss')
                )
                break
            case FY_18_19:
                setStartDate(
                    datetimeObject('01/07/2018 00:00:00', 'DD/MM/YYYY hh:mm:ss')
                )
                setEndDate(
                    datetimeObject('30/06/2019 23:59:59', 'DD/MM/YYYY hh:mm:ss')
                )
                break
            case FY_19_20:
                setStartDate(
                    datetimeObject('01/07/2019 00:00:00', 'DD/MM/YYYY hh:mm:ss')
                )
                setEndDate(
                    datetimeObject('30/06/2020 23:59:59', 'DD/MM/YYYY hh:mm:ss')
                )
                break
            case FY_20_21:
                setStartDate(
                    datetimeObject('01/07/2020 00:00:00', 'DD/MM/YYYY hh:mm:ss')
                )
                setEndDate(
                    datetimeObject('30/06/2021 23:59:59', 'DD/MM/YYYY hh:mm:ss')
                )
                break
            default:
                console.warn('The period requested is not recognised')
        }
    }

    return (
        <>
            <Row>
                <Col sm="3">
                    <DateFields
                        startDate={startDate}
                        endDate={endDate}
                        updateStartDate={setStartDate}
                        updateEndDate={setEndDate}
                    />
                </Col>
                <Col sm="9">
                    <Button
                        style={button}
                        variant="outline-info"
                        as="input"
                        type="button"
                        value="FY 17/18"
                        onClick={() => setPeriods(FY_17_18)}
                    />{' '}
                    <Button
                        style={button}
                        variant="outline-info"
                        as="input"
                        type="button"
                        value="FY 18/19"
                        onClick={() => setPeriods(FY_18_19)}
                    />{' '}
                    <Button
                        style={button}
                        variant="outline-info"
                        as="input"
                        type="button"
                        value="FY 19/20"
                        onClick={() => setPeriods(FY_19_20)}
                    />{' '}
                    <Button
                        style={button}
                        variant="outline-info"
                        as="input"
                        type="button"
                        value="FY 20/21"
                        onClick={() => setPeriods(FY_20_21)}
                    />{' '}
                </Col>
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
