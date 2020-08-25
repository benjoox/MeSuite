import React from 'react'
import { Tab } from 'react-bootstrap'
import AccountContainer from '../AccountContainer'

const TabItems = ({ accounts }) => {
    const menu = []
    Object.entries(accounts).map((el) => {
        menu.push(
            <Tab.Pane key={Math.random() * 1000} eventKey={el[0]}>
                <AccountContainer transactions={el[1]} name={el[0]} />
            </Tab.Pane>
        )
        return menu
    })

    return <Tab.Content>{menu} </Tab.Content>
}

export default TabItems
