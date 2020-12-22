import {
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
                const user = await authoriseUser(authorization)
                const content = await updateAccountTransaction(body, user)
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
        if (err.message === 'invalid signature') {
            res.status(401).send({
                error: 'Unauthorized',
                message: 'The user is not verfied. Try logging out and in',
            })
        } else if (err.errno === 'ECONNREFUSED') {
            res.status(500).send({
                error: 'Server error',
                message: 'Cannot connect to the database',
            })
        } else if (err.code === 'ValidationException') {
            res.status(500).send({
                error: 'Server error',
                message: err.message,
            })
        } else {
            res.status(500).send({
                error: 'Server error',
                message: err,
            })
        }
    }
}
