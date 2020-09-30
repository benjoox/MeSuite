import React from 'react'
import AccountContextProvider from '../src/store/AccountContextProvider'
import AccountsPage from '../src/components/AccountsPage'
import OnboardingInstructionPanel from '../src/components/OnboardingInstructionPanel'
import AccountError from '../src/components/AccountsPage/AccountErrors'

export default function Accounts() {
    return (
        <AccountContextProvider>
            <AccountError />
            <OnboardingInstructionPanel />
            <AccountsPage />
        </AccountContextProvider>
    )
}
