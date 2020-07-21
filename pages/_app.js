import React from 'react';
import { Auth0Provider } from "@auth0/auth0-react"
import { Container } from 'react-bootstrap'
import Navbar from '../components/shared/NavigationBar'

import '../components/App.css' 
import 'bootstrap/dist/css/bootstrap.min.css'

function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.AUTH_DOMAIN}
      clientId={process.env.AUTH_CLIENT_ID}
      redirectUri={process.env.AUTH_REDIRECT_URI}
      audience={`https://${process.env.AUTH_DOMAIN}/api/v2/`}
      scope="read:current_user update:current_user_metadata"
    >   
        <Container>
          <Navbar />
          <Component {...pageProps} />
        </Container>
    </Auth0Provider>
  );
}

export default App;