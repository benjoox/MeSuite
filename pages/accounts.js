import React from 'react'
import AccountContextProvider from '../store/AccountContextProvider'
import AccountsPage from '../components/AccountsPage'
import OnboardingInstructionPanel from '../components/OnboardingInstructionPanel'

export default function Accounts() {
    return (
        <AccountContextProvider>
            <OnboardingInstructionPanel />
            <AccountsPage />
        </AccountContextProvider>
    )
}
