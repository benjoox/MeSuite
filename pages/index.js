import App from '../src/App.js'
import { Auth0Provider } from "@auth0/auth0-react";

export default function() {
  return <Auth0Provider
      domain={process.env.AUTH_DOMAIN}
      clientId={process.env.AUTH_CLIENT_ID}
      redirectUri={process.env.AUTH_REDIRECT_URI}
      audience={`https://${process.env.AUTH_DOMAIN}/api/v2/`}
      scope="read:current_user update:current_user_metadata"
    >   
    <App /> 
  </Auth0Provider>
}
