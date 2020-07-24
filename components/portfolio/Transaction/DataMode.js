import React, { useContext } from 'react'
import { Form } from 'react-bootstrap'
import { PortfolioContext } from '../context' 

const DataMode = () => {
    const { mode, switchMode } = useContext(PortfolioContext)    

    return <Form>
        <Form.Check 
            type="switch"
            id="modeSwtich"
            label={mode ? 'Online' : 'Offline'}
            onChange={() => switchMode(!mode)}
            checked={mode}
        />
    </Form>
}

export default DataMode