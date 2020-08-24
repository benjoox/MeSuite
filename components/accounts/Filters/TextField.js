import React from 'react'
import { InputGroup, FormControl, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export default function TextField(props) {
    return (
        <Form.Group controlId={props.id}>
            <InputGroup className="mb-3" size="md">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                        <FontAwesomeIcon icon={faFilter} />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={props.searchText}
                    onChange={props.onTextChange}
                    placeholder="search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        </Form.Group>
    )
}
