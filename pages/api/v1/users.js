import jwt from 'jsonwebtoken'
import { accessToken } from './_utils'
import { create } from '../models/users'

async function authorise(authorization) {
    const decoded = jwt.verify(
        accessToken(authorization),
        process.env.AUTH_PUBLIC_KEY
    )
    const { sub } = decoded
    const userDetailsByIdUrl = `https://${process.env.AUTH_DOMAIN}/api/v2/users/${sub}`
    const response = await fetch(userDetailsByIdUrl, {
        headers: {
            authorization,
        },
    })

    const user = await response.json()
    return user
}

export default async (req, res) => {
    const { method } = req
    switch (method) {
        case 'GET': {
            const { authorization } = req.headers
            const user = authorise(authorization)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(user))
            break
        }
        default:
            console.log('The HTTP method requesed is not valid')
    }
}

export function createUser(email) {
    return create(email)
}

export async function authoriseUser(authorization) {
    const user = await authorise(authorization)
    const { email } = user
    await createUser(email)
    return email
}
