import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'
import { Navbar, Nav, Spinner } from 'react-bootstrap'
import UserMenu from './UserMenu'
import DataMode from './DataMode'

export default function NavigationBar() {
    const { isLoading } = useAuth0()

    return (
        <Navbar bg="dark" expand="lg" className="d-flex">
            <Link href="/" passHref>
                <Nav.Link>
                    <h3>Me Suite</h3>
                </Nav.Link>
            </Link>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse
                id="navbar-nav"
                className="d-flex justify-content-end"
            >
                <div>
                    <DataMode />
                </div>
                <Link href="/accounts" passHref>
                    <Nav.Link>Accounts</Nav.Link>
                </Link>
                <Link href="/markets" passHref>
                    <Nav.Link>Markets</Nav.Link>
                </Link>
                <Link href="/calculator" passHref>
                    <Nav.Link>Calculator</Nav.Link>
                </Link>

                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : (
                    <UserMenu />
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}
