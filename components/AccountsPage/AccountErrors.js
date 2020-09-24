import React, { useContext } from 'react'
import { AccountsContext } from '../../store/AccountContextProvider'
import Error from '../shared/Error'

const AccountErrors = () => {
    const { error, resetError } = useContext(AccountsContext)
    const { message, status } = error
    return (
        <>
            {error.status ? (
                <Error
                    message={message}
                    status={status}
                    resetError={resetError}
                />
            ) : (
                ''
            )}
        </>
    )
}

export default AccountErrors
