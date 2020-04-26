import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'

const { Group, Label, Control, Row } = Form;

export default function Price() {
    return <Row>
                <Col>
                    <Group>
                        <Label>Number of shares</Label>
                        <Control
                            placeholder="1000"
                            aria-label="Number of shares"
                            onChange={setNumberOfShares}
                            value={shares}
                        />
                    </Group>
                </Col>
                <Col>
                    <Group className="mb-3">
                        <Label>
                            Change the number of shares
                        </Label>
                        <Control
                            type="range"
                            placeholder="55.02"
                            aria-label="Change the number of shares"
                            onChange={setNumberOfShares}
                            value={shares}
                        />
                    </Group>
                </Col>
            </Row>
}