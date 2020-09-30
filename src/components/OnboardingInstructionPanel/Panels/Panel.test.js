// __tests__/fetch.test.js
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import Panel, { MARKET_PAGE_ROUTE_NAME } from '.'
import {
    AccountsContext,
    ACCOUNT_PAGE_ROUTE_NAME,
} from '../../../store/AccountContextProvider'
import { MarketContext } from '../../../store/MarketContextProvider'

jest.mock('next/router')
jest.mock('../../../store/AccountContextProvider')

describe('Panel test for accounts page ', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            pathname: `/${ACCOUNT_PAGE_ROUTE_NAME}`,
        })
    })
    const value = {
        accountsAvailable: true,
        ACCOUNT_FILE_HEADERS: [
            'date',
            'amount',
            'description',
            'category',
            'account',
            'balance',
        ],
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
            pathname: `/${MARKET_PAGE_ROUTE_NAME}`,
        })
    })
    const value = {
        tradesAvailable: true,
        ACCOUNT_FILE_HEADERS: [
            'date',
            'amount',
            'description',
            'category',
            'account',
            'balance',
        ],
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
