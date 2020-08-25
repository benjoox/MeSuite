import React from 'react'
import AccountContextProvider from '../store/AccountContextProvider'
import Menu from '../components/accounts/menu'

export default function Accounts() {
    return (
        <AccountContextProvider>
            <Menu />
        </AccountContextProvider>
    )
}
