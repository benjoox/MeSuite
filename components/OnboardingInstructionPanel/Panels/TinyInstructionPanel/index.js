// @flow

import React from 'react'
import { Row, Col } from 'react-bootstrap'

type Props = {
    children: React.Element,
    message: string,
}

function TinyInstructionPanel({ children, message }: Props): React.Node {
    return (
        <Row
            style={{
                margin: '1rem',
                padding: '1rem',
                backgroundColor: '#e9ecef',
            }}
        >
            <Col sm={10}>
                <p>{message}</p>
            </Col>
            <Col sm={2}>{children}</Col>
        </Row>
    )
}

export default TinyInstructionPanel
