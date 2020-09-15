// @flow

import React from 'react'
import { Row, Jumbotron } from 'react-bootstrap'

type Props = {
    children: React.Element,
    message: string,
}

const text = { height: '90px' }

function TinyInstructionPanel({ children, message }: Props): React.Node {
    return (
        <Row
            className="justify-content-center column"
            style={{ margin: '1rem' }}
        >
            <Jumbotron style={{ textAlign: 'center' }}>
                <p style={text}>{message}</p>
                {children}
            </Jumbotron>
        </Row>
    )
}

export default TinyInstructionPanel
