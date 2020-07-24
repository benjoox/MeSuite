import React, { useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import Link from 'next/link'
import { Navbar, Nav, Spinner } from 'react-bootstrap'
import UserMenu from './UserMenu'
import DataMode from '../portfolio/Transaction/DataMode'

export default function NavigationBar() {
    const { isLoading } = useAuth0()

    return (
            <Navbar bg="dark" expand="lg" className="d-flex">
                <Link href='/' passHref> 
                    <Nav.Link> 
                        <h3>Me Suite</h3>
                    </Nav.Link> 
                </Link>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="d-flex justify-content-end">
                    <div>
                        <DataMode />
                    </div>
                    <Link href='/accounts' passHref>
                        <Nav.Link>Accounts</Nav.Link> 
                    </Link>
                    <Link href='/portfolio' passHref>
                        <Nav.Link>Portfolio</Nav.Link> 
                    </Link>
                    
                    { 
                        isLoading
                        ? 
                        <Nav>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </Nav>
                        :
                        <UserMenu />
                    }

                </Navbar.Collapse>
            </Navbar>
    )
}