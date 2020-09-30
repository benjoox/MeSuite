import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'

import { AppContext } from '../../src/store/AppContextProvider'
import {
    AccountsContext,
    ACCOUNT_PAGE_ROUTE_NAME,
} from '../../src/store/AccountContextProvider'
import AccountsPage from '../../src/components/AccountsPage'
import OnboardingInstructionPanel from '../../src/components/OnboardingInstructionPanel'

jest.mock('@auth0/auth0-react')
jest.mock('next/router')

const accountPage = ({
    modeIsOnline,
    headers,
    accountsAvailable,
    accounts,
    uploadAccountTransactionFile,
}) => {
    render(
        <AppContext.Provider value={{ modeIsOnline }}>
            <AccountsContext.Provider
                value={{
                    uploadAccountTransactionFile,
                    ACCOUNT_FILE_HEADERS: headers,
                    accountsAvailable,
                    accounts,
                }}
            >
                <OnboardingInstructionPanel />
                <AccountsPage />
            </AccountsContext.Provider>
        </AppContext.Provider>
    )
}

describe('Account page content', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
        })

        useRouter.mockReturnValue({
            pathname: '/accounts',
        })
    })

    it(`should trigger an API call
        isOnline: true,
        isAuthenticated: true,
        and the user has uploaded 
        `, async () => {
        const uploadAccountTransactionFileMock = jest.fn(() => true)

        const testCase = {
            modeIsOnline: true,
            ACCOUNT_PAGE_ROUTE_NAME: `/${ACCOUNT_PAGE_ROUTE_NAME}`,
            headers: ['date', 'amount', 'description', 'balance', 'category'],
            uploadAccountTransactionFile: uploadAccountTransactionFileMock,
            accountsAvailable: false,
        }
        accountPage(testCase)

        const csvArray = [
            'date, amount, description, balance, category',
            `06/08/2020 10:08:00,"-1409.12","AIRBNB * HM5XFCTTFY Surry Hills AU AUS Card xx3285 Value Date: 02/08/2020","+54.49","Travel"`,
        ]
        const button = screen.getByLabelText('Upload')
        const csvFile = new Blob([csvArray.join('\n')], { type: 'text/csv' })
        const file = new File([csvFile], 'chucknorris.png', {
            type: 'image/png',
        })

        Object.defineProperty(button, 'files', { value: [file] })
        fireEvent.change(button)
        await waitFor(() => screen.getByText('Cancel'))
        const confirmButton = await waitFor(async () =>
            screen.getByText('Confirm')
        )
        expect(confirmButton.textContent).toBe('Confirm')
        fireEvent.click(confirmButton)
        const testCaseExpectation = [
            {
                date: '06/08/2020 08:08:00',
                amount: '-1409.12',
                description:
                    'AIRBNB * HM5XFCTTFY Surry Hills AU AUS Card xx3285 Value Date: 02/08/2020',
                balance: '+54.49',
                category: 'Travel',
            },
        ]
        expect(uploadAccountTransactionFileMock).toHaveBeenCalledWith(
            testCaseExpectation
        )
        expect(uploadAccountTransactionFileMock).toHaveBeenCalledTimes(1)
    })

    it(`should display one entry in the side menu
        isOnline: false,
        isAuthenticated: true,
        and an account are available
        `, () => {
        const accountTestCase = [
            {
                date: '06/08/2020',
                amount: '-1409.12',
                description:
                    'AIRBNB * HM5XFCTTFY Surry Hills AU AUS Card xx3285 Value Date: 02/08/2020',
                balance: '+54.49',
                category: 'Travel',
            },
            {
                date: '06/08/2020',
                amount: '-18.31',
                description:
                    'Amazon Web Services aws.amazon.co GB GBR Card xx3285 AUD 18.31 Value Date: 03/08/2020',
                balance: '+1463.61',
                category: 'Retail shopping',
            },
            {
                date: '05/08/2020',
                amount: '-0.05',
                description:
                    'International Transaction Fee Value Date: 03/08/2020',
                balance: '+1481.92',
                category: 'Fees & charges',
            },
            {
                date: '05/08/2020',
                amount: '-1.64',
                description:
                    'AWS EMEA aws.amazon.co LU LUX Card xx3285 USD 1.17 Value Date: 03/08/2020',
                balance: '+1481.97',
                category: 'Business expenses',
            },
        ]
        const testCase = {
            modeIsOnline: false,
            accountsAvailable: true,
            accounts: { accountTestCase },
            ACCOUNT_PAGE_ROUTE_NAME: `/${ACCOUNT_PAGE_ROUTE_NAME}`,
        }

        accountPage(testCase)

        screen.getByText('ACCOUNTTESTCASE')
    })
})
