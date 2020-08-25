import React, { useState, useRef } from 'react'
import { string } from 'prop-types'
import { Col, Tooltip, Overlay } from 'react-bootstrap'

const pointer = {
    cursor: 'pointer',
}

export default function Item(props) {
    const [show, setShow] = useState(false)
    const target = useRef(null)

    const { tooltip = null, value, label } = props
    return (
        <Col>
            <button
                type="button"
                ref={target}
                onClick={() => setShow(!show)}
                style={pointer}
            >
                {label}
            </button>
            &nbsp;
            {tooltip ? (
                <Overlay target={target.current} show={show} placement="top">
                    {() => (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <Tooltip id="overlay" {...props}>
                            {tooltip}
                        </Tooltip>
                    )}
                </Overlay>
            ) : (
                ''
            )}
            {value}
        </Col>
    )
}

Item.defaultProps = {
    tooltip: '',
}

Item.propTypes = {
    tooltip: string,
    label: string.isRequired,
    value: string.isRequired,
}
