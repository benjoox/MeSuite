import React from 'react'
import renderer from 'react-test-renderer'
import { useRouter } from 'next/router'
import Panel, { ACCOUNT_PAGE_ROUTE_NAME } from '.'

jest.mock('next/router')

describe('Panel section ', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            pathname: ACCOUNT_PAGE_ROUTE_NAME,
        })
    })
    it('renders correctly', () => {
        const tree = renderer
            .create(<Panel message="this is a message" />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
