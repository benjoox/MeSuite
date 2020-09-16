// @flow

import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import JumboInstructionPanel from './JumboInstructionPanel'
import TinyInstructionPanel from './TinyInstructionPanel'
import { AccountsContext } from '../../../store/AccountContextProvider'
import { MarketContext } from '../../../store/MarketContextProvider'
import UploadButton from '../../shared/UploadButton'

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

    const handleUpload = () => {
        if (route === ACCOUNT_PAGE_ROUTE_NAME) {
            return uploadAccountTransactionFile
        }
        if (route === MARKET_PAGE_ROUTE_NAME) {
            return uploadMarketTransactionsFile
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
                    <UploadButton
                        handleUpload={handleUpload()}
                        headers={headers()}
                    />
                </TinyInstructionPanel>
            ) : (
                <JumboInstructionPanel message={message}>
                    <UploadButton
                        handleUpload={handleUpload()}
                        headers={headers()}
                    />
                </JumboInstructionPanel>
            )}
        </>
    )
}

export { ACCOUNT_PAGE_ROUTE_NAME, MARKET_PAGE_ROUTE_NAME }
