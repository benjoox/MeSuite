// __tests__/fetch.test.js
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import Panel, { ACCOUNT_PAGE_ROUTE_NAME, MARKET_PAGE_ROUTE_NAME } from '.'
import UploadButton from '../../shared/UploadButton'
import { AccountsContext } from '../../../store/AccountContextProvider'
import { MarketContext } from '../../../store/MarketContextProvider'

jest.mock('next/router')
jest.mock('../../shared/UploadButton')
jest.mock('../../../store/AccountContextProvider')
jest.mock('../../../store/MarketContextProvider')

describe('Panel test for accounts page ', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            pathname: ACCOUNT_PAGE_ROUTE_NAME,
        })
        UploadButton.mockReturnValue(<div>A button</div>)
    })
    const value = {
        accountsAvailable: true,
    }
    test('should display the message passed to the panel', async () => {
        const { getByText } = render(
            <AccountsContext.Provider value={value}>
                <Panel message="test message" />
            </AccountsContext.Provider>
        )

        expect(getByText('test message')).toHaveTextContent('test message')
    })
})

describe('Panel test for market page ', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            pathname: MARKET_PAGE_ROUTE_NAME,
        })
        UploadButton.mockReturnValue(<div>A button</div>)
    })
    const value = {
        tradesAvailable: true,
    }
    test('should display the message passed to the panel', async () => {
        const { getByText } = render(
            <MarketContext.Provider value={value}>
                <Panel message="test message" />
            </MarketContext.Provider>
        )

        expect(getByText('test message')).toHaveTextContent('test message')
    })
})
