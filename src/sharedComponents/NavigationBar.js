import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { Navbar, Nav, Spinner } from 'react-bootstrap'
import UserMenu from './UserMenu'

export default function NavigationBar() {
    const { isLoading } = useAuth0()

    return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Me </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='#'>
                            Accounts 
                        </Nav.Link>
                        <Nav.Link href='#'>
                            Portfolio 
                        </Nav.Link>
                    </Nav>
                    

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