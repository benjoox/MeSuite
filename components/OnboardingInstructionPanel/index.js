// @flow

import React, { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { AppContext } from '../../store/AppContextProvider'
import { AccountsContext } from '../../store/AccountContextProvider'
import Panels from './Panels'

export default function AccountHome() {
    const { isAuthenticated } = useAuth0()
    const { modeIsOnline } = useContext(AppContext)
    const { accounts } = useContext(AccountsContext)
    let message = null

    const contentAvailable = () => accounts && accounts.length > 0

    if (isAuthenticated) {
        if (!modeIsOnline && !contentAvailable()) {
            return (
                <Panels message="Import your first account and explore it in offline mode. Nothing will be saved and you will use your work if you refresh" />
            )
        }
        if (modeIsOnline && !contentAvailable()) {
            return (
                <Panels message="Upload a CSV file. We will save it for you." />
            )
        }
        if (!modeIsOnline) {
            message = 'Upload another account. You will loose this page.'
        } else {
            message = 'Add a new account.'
        }
    } else {
        if (!modeIsOnline && !contentAvailable()) {
            return (
                <Panels message="Upload your account and explore your data without saving them. Login and change to online mode to save your data." />
            )
        }
        if (modeIsOnline && !contentAvailable()) {
            return (
                <Panels message="Import an account and explore it without saving any data. Login to save your data." />
            )
        }
        if (!modeIsOnline) {
            message = 'Upload another account. You will loose this page.'
        } else {
            message =
                'Upload a new account to explore them without saving or login to save your data.'
        }
    }

    return <Panels message={message} />
}
