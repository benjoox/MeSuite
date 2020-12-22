import React, { useState, useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from './AppContextProvider'
import * as API from '../apiCalls'
import { isEmpty } from './__utils'
import { timestamp, datetimeDisplay, datetimeObject } from '../__utils'

export const AccountsContext = React.createContext('Accounts')

const ACCOUNT_TRANSACTIONS = 'accountTransactions'
const ACCOUNTS = 'accounts'
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
    const [selectedAccount, setSelectedAccount] = useState({
        name: '',
        transactions: {},
    })

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
        try {
            const accessToken = await getAccessToken()
            const content = await API.fetchEntity(accessToken, ACCOUNTS)
            setAccounts(isEmpty(content) ? [] : content)
            const { name } = selectedAccount

            setSelectedAccount({ name, transactions: content[name] })
            setLoading(false)
            resetError()
        } catch (err) {
            setError({
                status: true,
                message: err.message,
            })
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
            await API.save(params, accessToken, ACCOUNT_TRANSACTIONS)
            await fetchAccounts()
        } catch (err) {
            setError({
                status: true,
                message: err.message,
            })
        }
    }

    async function deleteAccountTransaction(id) {
        try {
            const accessToken = await getAccessToken()
            await API.deleteEntity(id, accessToken, ACCOUNT_TRANSACTIONS)
            await fetchAccounts()
        } catch (err) {
            setError({
                status: true,
                message: err.message,
            })
        }
    }

    async function deleteAccount() {
        setLoading(true)
        try {
            const accessToken = await getAccessToken()
            await API.deleteEntity(
                { name: selectedAccount.name },
                accessToken,
                ACCOUNTS
            )
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
        try {
            const accessToken = await getAccessToken()
            await API.update(transaction, accessToken, ACCOUNT_TRANSACTIONS)
            await fetchAccounts()
        } catch (err) {
            setError({
                status: true,
                message: err.message.message,
            })
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

    function selectAccount(accountName) {
        setSelectedAccount({
            name: accountName,
            transactions: accounts[accountName],
        })
    }

    function filterByTag() {
        console.log('')
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
        selectedAccount,
        selectAccount,
        deleteAccount,
        filterByTag,
    }

    return (
        <AccountsContext.Provider value={value}>
            {children}
        </AccountsContext.Provider>
    )
}
