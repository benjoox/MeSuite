import {
    getAccounts,
    createAccountTransaction,
    deleteAccountTransaction,
    updateAccountTransaction,
} from '../models/accounts'

import { authoriseUser } from './users'

export default async (req, res) => {
    const { method, body, headers } = req
    const { authorization } = headers
    try {
        switch (method) {
            case 'GET': {
                await authoriseUser(authorization)
                const content = await getAccounts()
                res.json({
                    success: true,
                    content,
                })
                break
            }
            case 'POST': {
                const user = await authoriseUser(authorization)
                const content = await createAccountTransaction(body, user)
                res.json({
                    success: true,
                    content,
                })
                break
            }
            case 'DELETE': {
                await authoriseUser(authorization)
                const content = await deleteAccountTransaction(body)
                res.json({
                    success: true,
                    content,
                })
                break
            }
            case 'PUT': {
                await authoriseUser(authorization)
                const content = await updateAccountTransaction(body)
                res.json({
                    success: true,
                    content,
                })
                break
            }
            default:
                console.warn('The switch statement is fallen back to default')
        }
    } catch (err) {
        console.error(err)
        if (err.message === 'invalid signature') {
            res.status(401).send({
                error: 'Unauthorized',
                message: 'The user is not verfied. Try logging out and in',
            })
        }
    }
}
