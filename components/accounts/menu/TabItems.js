import React from 'react'
import { Tab } from 'react-bootstrap';
import AccountContainer from '../AccountContainer'

const TabItems = ({ accounts }) => {
    const menu = []
    for(let k in accounts) {
        menu.push(<Tab.Pane eventKey={k}>
                    <AccountContainer name={k} transactions={accounts[k]}/>
                </Tab.Pane>
        )
    }
    return <Tab.Content>{ menu } </Tab.Content>
}

export default TabItems