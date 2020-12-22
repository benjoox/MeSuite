import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NavigationBar from '../NavigationBar'
import { AppContext } from '../../../store/AppContextProvider'

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
    it('should change the isOnlineMode when switch is clicked', async () => {
        expect.assertions(2)

        let modeIsOnline = true
        const { getByText } = render(
            <AppContext.Provider
                value={{
                    switchMode: jest.fn(() => {
                        modeIsOnline = !modeIsOnline
                    }),
                    modeIsOnline,
                }}
            >
                <NavigationBar />
            </AppContext.Provider>
        )
        const checkSwitch = getByText('Online').closest('div').firstChild

        expect(checkSwitch).toBeInTheDocument()
        expect(checkSwitch.checked).toBe(true)
    })
})
