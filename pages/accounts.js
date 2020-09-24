import React from 'react'
import AccountContextProvider from '../store/AccountContextProvider'
import AccountsPage from '../components/AccountsPage'
import OnboardingInstructionPanel from '../components/OnboardingInstructionPanel'
import AccountError from '../components/AccountsPage/AccountErrors'

export default function Accounts() {
    return (
        <AccountContextProvider>
            <AccountError />
            <OnboardingInstructionPanel />
            <AccountsPage />
        </AccountContextProvider>
    )
}
