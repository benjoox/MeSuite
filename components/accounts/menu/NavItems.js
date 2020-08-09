import React from 'react'
import { Nav } from 'react-bootstrap'

const NavItems = ({accounts}) => {
    const menu = []
    for(let k in accounts) {
        menu.push(<Nav.Item key={k} >
            <Nav.Link eventKey={k} >{k}</Nav.Link>
        </Nav.Item>
        )
    }

    return <Nav variant="pills" className="flex-column">
            { menu }
        </Nav>
}

export default NavItems