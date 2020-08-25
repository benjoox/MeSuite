import React, { useState, useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from './AppContextProvider'
import * as API from '../apiCalls'

export const AccountsContext = React.createContext('Accounts')

const isEmpty = (obj) =>
    Object.keys(obj).length === 0 && obj.constructor === Object

const ENTITY = 'accounts'

export default function AccountContextProvider(children) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [accounts, setAccounts] = useState([])
    const { mode } = useContext(AppContext)

    function getAccessToken() {
        return getAccessTokenSilently({
            audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
            scope: 'read:current_user',
        })
    }

    async function fetchAccounts() {
        try {
            const accessToken = await getAccessToken()
            const content = await API.fetchEntity(accessToken, ENTITY)

            setAccounts(isEmpty(content) ? [] : content)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (mode && isAuthenticated) {
            fetchAccounts()
        } else {
            setAccounts([])
        }
    }, [])

    async function saveAccountTransaction(account) {
        const params = Array.isArray(account) ? account : [account]
        try {
            const accessToken = await getAccessToken()
            await API.save(params, accessToken, ENTITY)
            await fetchAccounts()
        } catch (err) {
            console.error(err)
        }
    }

    async function deleteAccountTransaction(id) {
        try {
            const accessToken = await getAccessToken()
            await API.deleteEntity(id, accessToken, ENTITY)
            await fetchAccounts()
        } catch (err) {
            console.error(err)
        }
    }

    async function updateAccountTransaction(transaction) {
        try {
            const accessToken = await getAccessToken()
            await API.update(transaction, accessToken, ENTITY)
            await fetchAccounts()
        } catch (err) {
            console.error(err)
        }
    }

    const addAccountAndSave = (transactions, account = 'Temp account') => {
        if (mode && isAuthenticated) {
            const transactionWithAccount = transactions.map((el) => ({
                ...el,
                account,
            }))
            saveAccountTransaction(transactionWithAccount)
        } else {
            setAccounts({ [account]: transactions })
        }
    }

    const value = {
        deleteAccountTransaction,
        updateAccountTransaction,
        saveAccountTransaction,
        addAccountAndSave,
        fetchAccounts,
        accounts,
    }

    return (
        <AccountsContext.Provider value={value}>
            {children}
        </AccountsContext.Provider>
    )
}
