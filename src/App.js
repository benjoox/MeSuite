import React from 'react';
import { useAuth0 } from "@auth0/auth0-react"
import Home from './components/Home'
import Login from './components/Login'

import './App.css' 
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const { isLoading, user, isAuthenticated } = useAuth0()

  if(isLoading) {
    return <div style={root}>
      Loading ...
    </div>
  } 

  return (
    <div style={root}>
        { isAuthenticated ? <Home user={user}/> : <Login />    }
    </div>
  );
}

export default App;

const root = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}