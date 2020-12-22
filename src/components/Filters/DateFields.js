// @flow

import React from 'react'

import { InputGroup, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { datetimeObject } from '../../__utils'
import type { MomentType } from '../../__utils'

type DateFieldsProps = {
    startDate: MomentType,
    endDate: MomentType,
    updateStartDate: (date: MomentType) => void,
    updateEndDate: (date: MomentType) => void,
}

const DateFields = ({
    startDate,
    endDate,
    updateStartDate,
    updateEndDate,
}: DateFieldsProps) => {
    function handleStartDateChange(date: string) {
        updateStartDate(
            datetimeObject(date.toString(), 'dd MMM DD YYYY hh:mm:ss')
        )
    }

    function handleEndDateChange(date: string) {
        updateEndDate(
            datetimeObject(date.toString(), 'dd MMM DD YYYY hh:mm:ss')
        )
    }

    return (
        <Form.Group controlId="exampleForm.ControlSelect1">
            <InputGroup className="mb-3" size="md">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                        Start date
                    </InputGroup.Text>
                    <DatePicker
                        selected={startDate.toDate()}
                        onChange={handleStartDateChange}
                        dateFormat="dd/MM/yyyy"
                        selectsStart
                        startDate={startDate.toDate()}
                        endDate={endDate.toDate()}
                    />
                </InputGroup.Prepend>
            </InputGroup>
            <InputGroup className="mb-3" size="md">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                        End date
                    </InputGroup.Text>
                    <DatePicker
                        selected={endDate.toDate()}
                        onChange={handleEndDateChange}
                        dateFormat="dd/MM/yyyy"
                        selectsEnd
                        startDate={startDate.toDate()}
                        endDate={endDate.toDate()}
                        minDate={startDate.toDate()}
                    />
                </InputGroup.Prepend>
            </InputGroup>
        </Form.Group>
    )
}

export default DateFields
