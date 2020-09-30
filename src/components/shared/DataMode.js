import React, { useContext } from 'react'
import { Form } from 'react-bootstrap'
import { AppContext } from '../../store/AppContextProvider'

const DataMode = () => {
    const { modeIsOnline, switchMode } = useContext(AppContext)

    return (
        <Form style={{ color: '#007bff' }}>
            <Form.Check
                type="switch"
                id="modeSwtich"
                label={modeIsOnline ? 'Online' : 'Offline'}
                onChange={() => switchMode(!modeIsOnline)}
                checked={modeIsOnline}
                secondary={1}
            />
        </Form>
    )
}

export default DataMode
