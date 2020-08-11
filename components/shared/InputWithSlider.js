import React from 'react'
import { Form, Col } from 'react-bootstrap'

const { Group, Label, Control, Row } = Form;

export default function InputWithSlider(props) {
    const { value, onChange, label, placeholder = "", steps, min, max } = props 
    return (
        <Row style={{ 
                borderRadius: '4px',
                backgroundColor: 'lightgrey', 
                margin: '10px 0', 
                padding: '10px'
            }}>
            { props.children ? <Col xs={12}> {props.children} </Col> : "" }
            <Col xs={6} 
                style={{
                    paddingLeft: '5px',
                    flexDirection: 'column',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Group className="mb-3">
                    <Label style={{ fontWeight: 'bold' }}>
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
            <Col xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Group className="mb-3" > 
                    <Label></Label>
                    <Control
                        type="range"
                        onChange={onChange}
                        value={value}
                        step={steps}
                        min={min}
                        max={max}
                    />
                </Group>
            </Col>
            
            
        </Row>            
    )
}