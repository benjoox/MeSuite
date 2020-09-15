// __tests__/fetch.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useAuth0 } from '@auth0/auth0-react'
import AccountsHome from '.'
import { AppContext } from '../../store/AppContextProvider'
import { AccountsContext } from '../../store/AccountContextProvider'

jest.mock('@auth0/auth0-react')

describe('Account home for authenticated users and no accounts', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
        })
    })
    const accounts = []

    it(`Test 1:
        isOnline: false
        accounts: []
        result: jumbo notification: Import your first account and explore it in offline mode ...`, () => {
        const modeIsOnline = false
        render(
            <AppContext.Provider value={{ modeIsOnline }}>
                <AccountsContext.Provider value={{ accounts }}>
                    <AccountsHome />
                </AccountsContext.Provider>
            </AppContext.Provider>
        )

        const textOnScreen = screen.getByText(
            /^Import your first account and explore it in offline mode. Nothing will be saved and you will use your work if you refresh/
        )
        expect(textOnScreen).toHaveTextContent(
            'Import your first account and explore it in offline mode. Nothing will be saved and you will use your work if you refresh'
        )

        const nonExistingText = screen.queryByText(
            /^In the offline mode you can upload a CSV file and analyse your account without saving any data/
        )
        expect(nonExistingText).not.toBeInTheDocument()
    })

    it(`Test 2: 
        isOnline: true,
        result:
        'jumbo notification: Upload a CSV file. We will save it for you.',`, () => {
        const modeIsOnline = true
        render(
            <AppContext.Provider value={{ modeIsOnline }}>
                <AccountsContext.Provider value={{ accounts }}>
                    <AccountsHome />
                </AccountsContext.Provider>
            </AppContext.Provider>
        )

        const textOnScreen = screen.getByText(
            /^Upload a CSV file. We will save it for you./
        )
        expect(textOnScreen).toHaveTextContent(
            'Upload a CSV file. We will save it for you.'
        )

        const nonExistingText = screen.queryByText(
            /^Import your first account and explore it in offline mode. Nothing will be saved and you will use your work if you refresh/
        )
        expect(nonExistingText).not.toBeInTheDocument()
    })
})

describe('Account home for authenticated users and one or more accounts', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
        })
    })
    const accounts = ['']
    it(`Test 1: 
        isOnline: false,
        result: small notification: Upload another account. You will loose this page.`, () => {
        const modeIsOnline = false
        render(
            <AppContext.Provider value={{ modeIsOnline }}>
                <AccountsContext.Provider value={{ accounts }}>
                    <AccountsHome />
                </AccountsContext.Provider>
            </AppContext.Provider>
        )

        const textOnScreen = screen.getByText(
            /^Upload another account. You will loose this page./
        )
        expect(textOnScreen).toHaveTextContent(
            'Upload another account. You will loose this page.'
        )

        const nonExistingText = screen.queryByText(
            /^In the offline mode you can upload a CSV file and analyse your account without saving any data/
        )
        expect(nonExistingText).not.toBeInTheDocument()
    })
    it(`Test 2: 
        isOnline: true,
        result: 'Add a new account.'`, () => {
        const modeIsOnline = true
        render(
            <AppContext.Provider value={{ modeIsOnline }}>
                <AccountsContext.Provider value={{ accounts }}>
                    <AccountsHome />
                </AccountsContext.Provider>
            </AppContext.Provider>
        )

        const textOnScreen = screen.getByText(/^Add a new account./)
        expect(textOnScreen).toHaveTextContent('Add a new account.')

        const nonExistingText = screen.queryByText(
            /^In the offline mode you can upload a CSV file and analyse your account without saving any data/
        )
        expect(nonExistingText).not.toBeInTheDocument()
    })
})

describe('Account home tests for user who are non-authenticated and no accounts', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: false,
        })
    })

    const accounts = []
    it(`Test 1. 
        isOnline: false,
        result: jumbo notification: Upload your account and explore your data without saving them. Login and change to online mode to save your data.`, () => {
        const modeIsOnline = false
        render(
            <AppContext.Provider value={{ modeIsOnline }}>
                <AccountsContext.Provider value={{ accounts }}>
                    <AccountsHome />
                </AccountsContext.Provider>
            </AppContext.Provider>
        )

        const textOnScreen = screen.getByText(
            /^Upload your account and explore your data without saving them. Login and change to online mode to save your data./
        )
        expect(textOnScreen).toHaveTextContent(
            'Upload your account and explore your data without saving them. Login and change to online mode to save your data.'
        )

        const nonExistingText = screen.queryByText(
            /^In the offline mode you can upload a CSV file and analyse your account without saving any data/
        )
        expect(nonExistingText).not.toBeInTheDocument()
    })

    it(`Test 2: 
        isOnline: true,
        result: 'jumbo notification: Import an account and explore it without saving any data. Login to save your data.'`, () => {
        const modeIsOnline = true
        render(
            <AppContext.Provider value={{ modeIsOnline }}>
                <AccountsContext.Provider value={{ accounts }}>
                    <AccountsHome />
                </AccountsContext.Provider>
            </AppContext.Provider>
        )

        const textOnScreen = screen.getByText(
            /^Import an account and explore it without saving any data. Login to save your data./
        )
        expect(textOnScreen).toHaveTextContent(
            'Import an account and explore it without saving any data. Login to save your data.'
        )

        const nonExistingText = screen.queryByText(
            /^Login to be able to see your accounts or switch to offline mode/
        )
        expect(nonExistingText).not.toBeInTheDocument()
    })
})

describe('Account home tests for user who are non-authenticated and one or more accounts', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: false,
        })
    })

    const accounts = ['']
    it(`Test 1. 
        isOnline: false,
        result: jumbo notification: Upload another account. You will loose this page.`, () => {
        const modeIsOnline = false
        render(
            <AppContext.Provider value={{ modeIsOnline }}>
                <AccountsContext.Provider value={{ accounts }}>
                    <AccountsHome />
                </AccountsContext.Provider>
            </AppContext.Provider>
        )

        const textOnScreen = screen.getByText(
            /^Upload another account. You will loose this page./
        )
        expect(textOnScreen).toHaveTextContent(
            'Upload another account. You will loose this page.'
        )

        const buttonText = screen.getByText(/^Upload another account/)
        expect(buttonText).toHaveTextContent('Upload another account')

        const nonExistingText = screen.queryByText(
            /^In the offline mode you can upload a CSV file and analyse your account without saving any data/
        )
        expect(nonExistingText).not.toBeInTheDocument(
            'There are no accounts attached to this user. Import your account by uploading a CSV file'
        )
    })

    it(`Test 2: 
        isOnline: true,
        result: jumbo notification: Upload a new account to explore them without saving or login to save your data.`, () => {
        const modeIsOnline = true
        render(
            <AppContext.Provider value={{ modeIsOnline }}>
                <AccountsContext.Provider value={{ accounts }}>
                    <AccountsHome />
                </AccountsContext.Provider>
            </AppContext.Provider>
        )

        const textOnScreen = screen.getByText(
            /^Upload a new account to explore them without saving or login to save your data./
        )
        expect(textOnScreen).toHaveTextContent(
            'Upload a new account to explore them without saving or login to save your data.'
        )

        const nonExistingText = screen.queryByText(
            /^There are no accounts attached to this user. Import your account by uploading a CSV file/
        )
        expect(nonExistingText).not.toBeInTheDocument(
            'There are no accounts attached to this user. Import your account by uploading a CSV file'
        )
    })
})
