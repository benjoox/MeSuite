import React from 'react'
import renderer from 'react-test-renderer'
// import { useRouter } from 'next/router'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NavigationBar from '../NavigationBar'

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '/accounts',
            query: '',
            asPath: '',
        }
    },
}))
describe('NavigationBar', () => {
    it('should match the snapshot', () => {
        expect.assertions(1)
        const tree = renderer.create(<NavigationBar />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('should have selected classname for the selected link', () => {
        expect.assertions(2)
        const { getByText } = render(<NavigationBar />)

        const accountLink = getByText('Accounts')
        expect(accountLink).toBeInTheDocument()
        expect(accountLink.classList.contains('selected')).toBe(true)
    })
})
