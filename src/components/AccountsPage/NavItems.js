import React from 'react'
import { Nav } from 'react-bootstrap'

const NavItems = ({ accounts }) => {
    const menu = []
    Object.entries(accounts).map((el) => {
        menu.push(
            <Nav.Item key={el[0]}>
                <Nav.Link eventKey={el[0]}>{el[0].toUpperCase()}</Nav.Link>
            </Nav.Item>
        )
        return menu
    })

    return (
        <Nav variant="pills" className="flex-column">
            {menu}
        </Nav>
    )
}

export default NavItems
