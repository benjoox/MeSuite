
import jwt from 'jsonwebtoken'
const domain="dev-718z9jcz.eu.auth0.com" 

const publicKey = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJQ2l+V1uALNQ/MA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi03MTh6OWpjei5ldS5hdXRoMC5jb20wHhcNMjAwNjI5MTQwMzQwWhcN
MzQwMzA4MTQwMzQwWjAkMSIwIAYDVQQDExlkZXYtNzE4ejlqY3ouZXUuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2MaWFKg/uwPbmPbx
58cYbrCjwBiE3WEjDOxxIReZoN1OesB73fXDZuS+hVvWHrLMOI6+4uoTOvEhT0Hw
KTYbxdsMf/ENQXUhVzLjrHgig/7rswIfoaHbI41sj78T/1p0A4XFgzmNytjCA4DZ
PKUNIK145kLT8yiFISwozEz2oHJ+vUQpf2EpSQDu/wlqQzet6s7V1/p5UyfqzEZO
MB5lQoBz+mD23qrmkshuxnSFTE8gL4M64yu6cr51k02uO3owzrb4Ze8xTySXkaLH
ndN79gL/eER9IQTtbSdpUi9nWR2Cfrwwifw2LpOhh1Q0ri0RLihdHkQHuVwfKnpx
mosSiwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQP0nfmmNe6
AdyakF4dZOC0m4CBCDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AAnm5C8rksugVtz2l3Ky0Bf+DFeMLJtfDLviaf33GpfqbVFmxIueJeF2BkRfIr2K
e84R8rnPoD8FFOesnNtavVz19L9AflIkypxgeKkIymqHF7rAxjrPcPYy1UFcHijU
yMecj4mS6zl0r+D2hQh2lgEXaPTF1c/ICTPRPHfvQwlrxKBzB5Cbh6GDo6U2qbVu
gsJraAncgxrG3+Zz5sD026BSBcdKoqjRGanNcdopjYLPNyBYevLE81/KoduphFxj
2AFj9J81wXJKGv0VzgE3rR3DdHQWqTEY5HO/vW+pntuvUigvjqjVRs6dwRvQEXJ9
S//tPtrs/k/WCMpf0S1zTcg=
-----END CERTIFICATE-----`

export default async (req, res) => {
    const { method } = req
    switch(method) {
        case 'GET': 
            console.group('API GET the user by passing the accessToken', req)
            const { authorization } = req.headers
            console.log('The req.params are ', req.params)
            console.log('The authorization are ' , authorization)

            const accessToken = authorization.split(' ')[1]
            const decoded = jwt.verify(accessToken, publicKey)
            const { sub } =  decoded

            console.log('The user sub extracted from the decoded JWT is ', sub)
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${sub}`;
    
            console.log(`Calling the ${userDetailsByIdUrl} endpoint with the accessToken`)
    
            const response = await fetch(userDetailsByIdUrl, {
                headers: {
                    authorization
                }
            })
        
            const user = await response.json()
            console.log('The user returned from calling the function is ', user)

            res.setHeader('Content-Type', 'application/json')
            console.groupEnd()
            res.end(JSON.stringify(user))
            break;
        default:
            console.log('The HTTP method requesed is not valid')
    }
}