import React from 'react'
import { Nav } from 'react-bootstrap'

const NavItems = ({ tickers }) => {
    if(!tickers ) return ''
    const menu = []
    tickers.forEach((val, key) => {
        menu.push(<Nav.Item key={key} >
            <Nav.Link eventKey={key} >{key.toUpperCase()}</Nav.Link>
        </Nav.Item>)
    })

    return <Nav variant='pills' className='flex-column'> 
            <Nav.Item key='portfolio' >
                <Nav.Link eventKey='portfolio' >Portfolio</Nav.Link>
            </Nav.Item>
            { menu } 
        </Nav>
}

export default NavItems 