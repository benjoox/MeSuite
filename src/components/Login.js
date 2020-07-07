import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from 'react-bootstrap'
import fetch from 'isomorphic-fetch'

const LoginButton = () => {
  const { 
    loginWithPopup, 
    getAccessTokenSilently 
  } = useAuth0();

  async function login() {
    try {
      await loginWithPopup()
      const accessToken = await getAccessTokenSilently({
          audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        })
      const apiResponse = await fetch(`/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        })
  
      const user = await apiResponse.json() 
      console.log('the result of calling the /api/users is ', user)
    } catch(err) {
      console.error('Error in loggin the user in ', err)
    }
  }
  return <Button onClick={login}>Log In</Button>
};

export default LoginButton