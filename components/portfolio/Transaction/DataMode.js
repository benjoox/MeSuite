import React, { useContext } from 'react'
import { Form } from 'react-bootstrap'
import { AppContext } from '../../../pages/_app'

const DataMode = () => {
    const { mode, switchMode } = useContext(AppContext)

    return <Form style={{ color: '#007bff'}}>
        <Form.Check 
            type="switch"
            id="modeSwtich"
            label={mode ? 'Online' : 'Offline'}
            onChange={() => switchMode(!mode)}
            checked={mode}
            secondary
        />
    </Form>
}

export default DataMode