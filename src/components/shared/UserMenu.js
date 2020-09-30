import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Nav, NavDropdown } from 'react-bootstrap'
import Login from './Login'
import Logout from './Logout'
import Avatar from './Avatar'

export default function NavigationBar() {
    const { user, isAuthenticated } = useAuth0()

    return (
        <>
            {isAuthenticated ? (
                <Nav.Item>
                    <NavDropdown
                        title={<Avatar picture={user.picture} />}
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item href="#">
                            {user.nickname}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="">
                            <Logout user={user} />
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
            ) : (
                <Login />
            )}
        </>
    )
}
