import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from 'react-bootstrap'

const LogoutButton = props => {
  const { logout } = useAuth0();

  return <div>
        <span>{props.user.name} </span>
        
        <Button onClick={() => logout()}>Log Out</Button>
    </div>;
};

export default LogoutButton