/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { Container } from 'react-bootstrap'
import Navbar from '../components/shared/NavigationBar'
import AppContextProvider from '../store/AppContextProvider'

import '../components/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App({ Component, pageProps }) {
    return (
        <div>
            <Auth0Provider
                domain={process.env.AUTH_DOMAIN}
                clientId={process.env.AUTH_CLIENT_ID}
                redirectUri={process.env.AUTH_REDIRECT_URI}
                audience={`https://${process.env.AUTH_DOMAIN}/api/v2/`}
                scope="read:current_user update:current_user_metadata"
            >
                <AppContextProvider>
                    <Container fluid>
                        <Navbar />
                        <Component {...pageProps} />
                    </Container>
                </AppContextProvider>
            </Auth0Provider>
        </div>
    )
}

export default App
