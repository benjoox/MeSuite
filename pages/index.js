import { useAuth0 } from "@auth0/auth0-react"
import Home from './Home'

export default function() {
  const { user, isAuthenticated } = useAuth0()
  return <> { isAuthenticated ? <Home user={user} /> : '' } </>
}
