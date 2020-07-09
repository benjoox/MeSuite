import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'

const { Group, Label, Control, Row } = Form;

export default function Price(props) {
    const { value, onChange, label, placeholder = "" } = props 
    return (
        <Row>
            <Col>
                <Group className="mb-3">
                    <Label>
                        {label}
                    </Label>
                    <Control
                        type="text"
                        placeholder={placeholder}
                        aria-label={label}
                        onChange={onChange}
                        value={value}
                        
                    />
                </Group>
            </Col>
            <Col>
                <Group className="mb-3"> 
                    <Label></Label>
                    <Control
                        type="range"
                        onChange={onChange}
                        value={value}
                    />
                </Group>
            </Col>
            { props.children ? <Col> {props.children} </Col> : "" }
            
        </Row>            
    )
}