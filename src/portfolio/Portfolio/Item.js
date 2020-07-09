import React, { useState, useRef } from 'react'
import { string } from 'prop-types'
import { Col, Tooltip, Overlay } from 'react-bootstrap'

export default function Item(props) {
    const [show, setShow] = useState(false);
    const target = useRef(null)

    const { tooltip=null } = props
    return  <Col> 
                <b  ref={target} 
                    onClick={() => setShow(!show)}
                    style={pointer}
                >{props.label}</b> 
                <span dangerouslySetInnerHTML={{ __html: ':&nbsp'}} />
                {
                    tooltip
                    ?
                    <Overlay target={target.current} show={show} placement='top'>
                        {(props) => (
                            <Tooltip id='overlay' {...props}>
                                {tooltip}
                            </Tooltip>
                        )}
                    </Overlay>
                    :
                    ''
                }
                {props.value}
            </Col>
}

Item.propTypes = {
    tooltip: string,
    label: string.isRequired,
    value: string.isRequired
}

const pointer = {
    cursor: 'pointer'
}