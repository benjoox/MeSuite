import React, { useState, useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from './AppContextProvider'
import * as API from '../apiCalls'
import isEmpty from './__utils'

export const AccountsContext = React.createContext('Accounts')

const ENTITY = 'accounts'

export type Transaction = {
    date: any,
}

export default function AccountContextProvider({ children }) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [accounts, setAccounts] = useState([])
    const { modeIsOnline } = useContext(AppContext)

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
        if (modeIsOnline && isAuthenticated) {
            fetchAccounts()
        } else {
            setAccounts([])
        }
    }, [modeIsOnline])

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

    const uploadAccountTransactionFile = (transactions, account = 'temp') => {
        setAccounts([])

        if (modeIsOnline && isAuthenticated) {
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
        uploadAccountTransactionFile,
        fetchAccounts,
        accounts,
        accountsAvailable: !isEmpty(accounts),
        ACCOUNT_FILE_HEADERS: [
            'date',
            'amount',
            'description',
            'balance',
            'category',
        ],
    }

    return (
        <AccountsContext.Provider value={value}>
            {children}
        </AccountsContext.Provider>
    )
}
