// @flow

import React from 'react'
import { Row } from 'react-bootstrap'

type Props = {
    children: React.Element,
    message: string,
}

function TinyInstructionPanel({ children, message }: Props): React.Node {
    return (
        <Row
            style={{
                margin: '0',
                padding: '15px',
                backgroundColor: '#e9ecef',
                justifyContent: 'center',
            }}
        >
            <p>{message}</p>
            {children}
        </Row>
    )
}

export default TinyInstructionPanel
