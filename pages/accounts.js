import React from 'react'
import AccountContextProvider from '../store/AccountContextProvider'
import AccountsHome from '../components/AccountsHome'

export default function Accounts() {
    return (
        <AccountContextProvider>
            <AccountsHome />
        </AccountContextProvider>
    )
}
