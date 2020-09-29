// @flow

import React from 'react'
import { Row } from 'react-bootstrap'
import type { Element } from 'react'

type Props = {
    children: Element<string>,
    message: string,
}

function TinyInstructionPanel({ children, message }: Props) {
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
