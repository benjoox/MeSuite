import React from 'react';
import { useAuth0 } from "@auth0/auth0-react"
import { Container } from 'react-bootstrap'
import Home from './sharedComponents/Home'
import Login from './sharedComponents/Login'
import Navbar from './sharedComponents/NavigationBar'

import './App.css' 
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const { isLoading, user, isAuthenticated } = useAuth0()

  return (
    <Container>
        <Navbar />
        { isAuthenticated ? <Home user={user}/> : ''   }
    </Container>
  );
}

export default App;

const root = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}