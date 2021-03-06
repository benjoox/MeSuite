import { getAccounts, deleteAccount } from '../models/accounts'

import { authoriseUser } from './users'

export default async (req, res) => {
    const { method, headers, body } = req
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
            case 'DELETE': {
                await authoriseUser(authorization)
                const { name } = body

                if (!name)
                    throw Error('The name of the account should be provided.')

                const content = await deleteAccount(name)
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
                message:
                    'The data could not be validated. Too many items to process might be a reason.',
            })
        } else {
            res.status(500).send({
                error: 'Server error',
                message: err,
            })
        }
    }
}
