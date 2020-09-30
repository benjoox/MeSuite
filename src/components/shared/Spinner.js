// @flow
import React from 'react'
import { Spinner as BootstrapSpinner } from 'react-bootstrap'

const Spinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BootstrapSpinner animation="border" role="status" variant="secondary">
            <span className="sr-only">Loading...</span>
        </BootstrapSpinner>
    </div>
)

export default Spinner
