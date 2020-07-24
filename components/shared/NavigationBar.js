import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import Link from 'next/link'
import { Navbar, Nav, Spinner } from 'react-bootstrap'
import UserMenu from './UserMenu'

export default function NavigationBar() {
    const { isLoading } = useAuth0()

    return (
            <Navbar bg="light" expand="lg">
                <div>
                    <Link href='/'> 
                        <a>Me</a> 
                    </Link>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="mr-auto">
                        <div>
                            <Link href='/accounts'>
                                <a>Accounts</a>
                            </Link>
                        </div>
                        <div>
                            <Link href='/portfolio'>
                                <a>Portfolio</a>
                            </Link>
                        </div>
                    </div>
                    
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