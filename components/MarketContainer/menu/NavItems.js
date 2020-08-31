import React from 'react'
import { Nav } from 'react-bootstrap'

const NavItems = ({ tickers }) => {
    if (!tickers) return ''
    const menu = []
    Object.entries(tickers).map((el) => {
        menu.push(
            <Nav.Item key={Math.random() * 1000}>
                <Nav.Link eventKey={el[0]}>{el[0].toUpperCase()}</Nav.Link>
            </Nav.Item>
        )
        return menu
    })

    return (
        <Nav variant="pills" className="flex-column">
            <Nav.Item key="portfolio">
                <Nav.Link eventKey="portfolio">Portfolio</Nav.Link>
            </Nav.Item>
            {menu}
        </Nav>
    )
}

export default NavItems
