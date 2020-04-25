import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'

const { Group, Label, Control, Row } = Form;

export default function Price(props) {
    const { value, onChange, label, placeholder = "" } = props 
    return (
        <Row style={{ 
                borderRadius: '2px',
                backgroundColor: 'lightgrey', 
                margin: '10px', 
                padding: '10px'
            }}>
            { props.children ? <Col xs={12}> {props.children} </Col> : "" }
            <Col xs={6} style={{
                paddingLeft: '5px',
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center'
            }}>
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
            <Col xs={6}>
                <Group className="mb-3"> 
                    <Label></Label>
                    <Control
                        type="range"
                        onChange={onChange}
                        value={value}
                    />
                </Group>
            </Col>
            
            
        </Row>            
    )
}