/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { Container } from 'react-bootstrap'
import Navbar from '../components/shared/NavigationBar'

import '../components/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const AppContext = React.createContext('AppContext')

function App({ Component, pageProps }) {
    const [mode, switchMode] = useState(false) // false correspond to offline

    return (
        <div>
            <Auth0Provider
                domain={process.env.AUTH_DOMAIN}
                clientId={process.env.AUTH_CLIENT_ID}
                redirectUri={process.env.AUTH_REDIRECT_URI}
                audience={`https://${process.env.AUTH_DOMAIN}/api/v2/`}
                scope="read:current_user update:current_user_metadata"
            >
                <AppContext.Provider value={{ mode, switchMode }}>
                    <Container fluid>
                        <Navbar />
                        <Component {...pageProps} />
                    </Container>
                </AppContext.Provider>
            </Auth0Provider>
        </div>
    )
}

export default App
