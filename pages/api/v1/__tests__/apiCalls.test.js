import http from 'http'
import fetch from 'isomorphic-unfetch'
import { apiResolver } from 'next-server/dist/server/api-utils'
import listen from 'test-listen'
import handler from '../accounts'
import { authoriseUser } from '../users'
import { getAccounts } from '../../models/accounts'

jest.mock('../users')
jest.mock('../../models/accounts')

describe('/ GET ', () => {
    jest.setTimeout(30000)
    let server
    let url
    beforeAll(async (done) => {
        server = http.createServer((req, res) =>
            apiResolver(req, res, undefined, handler)
        )
        url = await listen(server)
        done()
    })

    afterAll((done) => {
        server.close(done)
    })
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        authoriseUser.mockReturnValue(() => true)
        getAccounts.mockReturnValue(() => ({ success: true }))
    })

    it('responds 200 to authed GET', async () => {
        expect.assertions(2)
        const response = await fetch(url)
        expect(response.status).toBe(200)
        const { success } = await response.json()
        expect(success).toBe(true)
    })
})
