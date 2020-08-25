import React from 'react'
import { InputGroup, FormControl, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export default function TextField({ id, searchText, onTextChange }) {
    return (
        <Form.Group controlId={id}>
            <InputGroup className="mb-3" size="md">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                        <FontAwesomeIcon icon={faFilter} />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={searchText}
                    onChange={onTextChange}
                    placeholder="search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        </Form.Group>
    )
}
