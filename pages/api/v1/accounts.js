import { 
    getAccounts, 
    createAccountTransaction, 
    deleteAccountTransaction, 
    updateAccountTransaction
} from '../models/accounts/index.js'
import { authorise, createUser } from './users'

async function authoriseUser(authorization) {
    const user = await authorise(authorization)
    const { email } = user
    await createUser(email)
    return email
}
export default async (req, res) => {
    const { method, body, headers } = req
    const { authorization } = headers
    try {
        switch(method) {
            case 'GET': {
                console.log('The GET method in accounts is called with headers')
                await authoriseUser(authorization)
                const content = await getAccounts()
                res.json({
                    success: true, 
                    content
                })
                break
            }
            case 'POST': {
                console.log('The POST method in account')
                const user = await authoriseUser(authorization)
                const content = await createAccountTransaction(body, user)
                res.json({
                    success: true, 
                    content
                })
                break
            }
            case 'DELETE': {    
                console.log('The DELETE method in account')
                await authoriseUser(authorization)
                const content = await deleteAccountTransaction(body)
                res.json({
                    success: true, 
                    content
                })
                break
            }
            case 'PUT': {
                console.log('The PUT method in accounts')
                const user = await authoriseUser(authorization)
                const content = await updateAccountTransaction(body)
                res.json({
                    success: true, 
                    content
                })
                break
            }
            default:
                console.log('The HTTP method requesed is not valid')
        }
    } catch(err) {
        console.log('Error in accounts API ', err)
        if(err.message === 'invalid signature') {
            res.status(401).send({
                error: 'Unauthorized',
                message: 'The user is not verfied. Try logging out and in'    
            })
        }
    }

}