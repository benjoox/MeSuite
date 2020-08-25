import { put, batchPutItem, scanAll } from '../models/transactions'
import { authoriseUser } from './users'

export default async (req, res) => {
    const { method, headers } = req
    const { authorization } = headers
    try {
        switch (method) {
            case 'GET': {
                await authoriseUser(authorization)

                const content = await scanAll()
                res.json({
                    success: true,
                    content,
                })
                break
            }
            case 'POST': {
                const user = await authoriseUser(authorization)
                const content = await batchPutItem(req.body, user)
                res.json({
                    success: true,
                    content,
                })
                break
            }
            case 'DELETE': {
                await authoriseUser(authorization)
                res.json({
                    success: true,
                    content: {},
                })
                break
            }
            case 'PUT': {
                await authoriseUser(authorization)
                const content = await put(req.body)
                res.json({
                    success: true,
                    content,
                })
                break
            }
            default:
                console.error('The HTTP method requesed is not valid')
        }
    } catch (err) {
        if (err.message === 'invalid signature') {
            res.status(401).send({
                error: 'Unauthorized',
                message: 'The user is not verfied. Try logging out and in',
            })
        }
    }
}
