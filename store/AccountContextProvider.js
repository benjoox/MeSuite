import React, { useState, useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from './AppContextProvider'
import * as API from '../apiCalls'
import isEmpty from './__utils'
import { timestamp, datetimeDisplay, datetimeObject } from '../src/__utils'

export const AccountsContext = React.createContext('Accounts')

const ENTITY = 'accounts'
export const ACCOUNT_PAGE_ROUTE_NAME = 'accounts'

export type Transaction = {
    date: any,
}

export default function AccountContextProvider({ children }) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [accounts, setAccounts] = useState([])
    const { modeIsOnline } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ status: false, message: '' })

    function resetError() {
        setError({ status: false, message: '' })
    }
    function getAccessToken() {
        return getAccessTokenSilently({
            audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
            scope: 'read:current_user',
        })
    }

    async function fetchAccounts() {
        setLoading(true)
        try {
            const accessToken = await getAccessToken()
            const content = await API.fetchEntity(accessToken, ENTITY)

            setAccounts(isEmpty(content) ? [] : content)
            setLoading(false)
        } catch (err) {
            setError({
                status: true,
                message: err.message,
            })
            setLoading(false)
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
        setLoading(true)
        const params = Array.isArray(account) ? account : [account]
        try {
            const accessToken = await getAccessToken()
            await API.save(params, accessToken, ENTITY)
            await fetchAccounts()
        } catch (err) {
            setError({
                status: true,
                message: err.message,
            })
            setLoading(false)
        }
    }

    async function deleteAccountTransaction(id) {
        setLoading(true)
        try {
            const accessToken = await getAccessToken()
            await API.deleteEntity(id, accessToken, ENTITY)
            await fetchAccounts()
        } catch (err) {
            setError({
                status: true,
                message: err.message,
            })
            setLoading(false)
        }
    }

    async function updateAccountTransaction(transaction) {
        setLoading(true)
        try {
            const accessToken = await getAccessToken()
            await API.update(transaction, accessToken, ENTITY)
            await fetchAccounts()
        } catch (err) {
            setError({
                status: true,
                message: err.message.message,
            })
            setLoading(false)
        }
    }

    const uploadAccountTransactionFile = (transactions, account = 'temp') => {
        setAccounts([])

        const transactionWithFormattedDates = transactions.map((el) => ({
            ...el,
            datetimeDisplay: datetimeDisplay(el.date),
            datetimeObject: datetimeObject(el.date),
            timestamp: timestamp(el.date),
        }))

        if (modeIsOnline && isAuthenticated) {
            saveAccountTransaction(transactionWithFormattedDates)
        } else {
            setAccounts({ [account]: transactionWithFormattedDates })
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
            'category',
            'account',
            'balance',
        ],
        loading,
        error,
        resetError,
    }

    return (
        <AccountsContext.Provider value={value}>
            {children}
        </AccountsContext.Provider>
    )
}
