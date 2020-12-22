import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar, Nav, Spinner } from 'react-bootstrap'
import UserMenu from './UserMenu'
import DataMode from './DataMode'

export default function NavigationBar() {
    const { isLoading } = useAuth0()

    return (
        <Navbar bg="dark" expand="lg" className="d-flex">
            <LinkWrapper href="/" passHref>
                <Nav.Link>
                    <h3>Me Suite</h3>
                </Nav.Link>
            </LinkWrapper>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse
                id="navbar-nav"
                className="d-flex justify-content-end"
            >
                <div>
                    <DataMode />
                </div>
                <LinkWrapper href="/accounts" passHref>
                    <Nav.Link>Accounts</Nav.Link>
                </LinkWrapper>
                <LinkWrapper href="/markets" passHref>
                    <Nav.Link>Markets</Nav.Link>
                </LinkWrapper>
                <LinkWrapper href="/calculator" passHref>
                    <Nav.Link>Calculator</Nav.Link>
                </LinkWrapper>

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

const LinkWrapper = ({ href, children }) => {
    const router = useRouter()

    let className = children.props.className || ''
    if (router.pathname === href) {
        className = `${className} selected`
    }

    return (
        <Link href={href} passHref>
            {React.cloneElement(children, { className })}
        </Link>
    )
}
