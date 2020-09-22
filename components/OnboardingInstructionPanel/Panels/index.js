// @flow

import React, { useContext } from 'react'
import ReactCSVUpload from 'react-csv-upload-test'
import { useRouter } from 'next/router'
import JumboInstructionPanel from './JumboInstructionPanel'
import TinyInstructionPanel from './TinyInstructionPanel'
import { AccountsContext } from '../../../store/AccountContextProvider'
import { MarketContext } from '../../../store/MarketContextProvider'

type Props = {
    message: string,
}

const ACCOUNT_PAGE_ROUTE_NAME = 'accounts'
const MARKET_PAGE_ROUTE_NAME = 'markets'

export default function Panels({ message }: Props) {
    const { pathname } = useRouter()
    const route = pathname.substr(1)
    const {
        accountsAvailable,
        uploadAccountTransactionFile,
        ACCOUNT_FILE_HEADERS,
    } = useContext(AccountsContext)

    const {
        tradesAvailable,
        uploadMarketTransactionsFile,
        MARKET_FILE_HEADERS,
    } = useContext(MarketContext)

    const handleUpload = (file) => {
        if (route === ACCOUNT_PAGE_ROUTE_NAME) {
            return uploadAccountTransactionFile(file)
        }
        if (route === MARKET_PAGE_ROUTE_NAME) {
            return uploadMarketTransactionsFile(file)
        }
        return null
    }

    const headers = () => {
        if (route === ACCOUNT_PAGE_ROUTE_NAME) {
            return ACCOUNT_FILE_HEADERS
        }
        if (route === MARKET_PAGE_ROUTE_NAME) {
            return MARKET_FILE_HEADERS
        }

        return null
    }

    return (
        <>
            {accountsAvailable || tradesAvailable ? (
                <TinyInstructionPanel message={message}>
                    <ReactCSVUpload
                        headers={headers()}
                        handleFile={handleUpload}
                    />
                </TinyInstructionPanel>
            ) : (
                <JumboInstructionPanel message={message}>
                    <ReactCSVUpload
                        headers={headers()}
                        handleFile={handleUpload}
                    />
                </JumboInstructionPanel>
            )}
        </>
    )
}

export { ACCOUNT_PAGE_ROUTE_NAME, MARKET_PAGE_ROUTE_NAME }
