// @flow

import React from 'react'
import { Row, Jumbotron } from 'react-bootstrap'
import type { Element } from 'react'

type Props = {
    children: Element<string>,
    message: string,
}

export default function JumboInstructionPanel({ children, message }: Props) {
    return (
        <Row
            className="justify-content-center column"
            style={{ margin: '1rem' }}
        >
            <Jumbotron style={{ textAlign: 'center' }}>
                <p style={{ height: '90px' }}>{message}</p>
                {children}
            </Jumbotron>
        </Row>
    )
}
