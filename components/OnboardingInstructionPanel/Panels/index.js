// @flow

import React, { useContext } from 'react'
import JumboInstructionPanel from './JumboInstructionPanel'
import TinyInstructionPanel from './TinyInstructionPanel'
import { AccountsContext } from '../../../store/AccountContextProvider'
import UploadButton from '../../shared/UploadButton'

type Props = {
    message: string,
}
export default function OnboardingInstructionPanel({ message }: Props) {
    const { accountsAvailable } = useContext(AccountsContext)
    return (
        <>
            {accountsAvailable ? (
                <TinyInstructionPanel message={message}>
                    <UploadButton />
                </TinyInstructionPanel>
            ) : (
                <JumboInstructionPanel message={message}>
                    <UploadButton />
                </JumboInstructionPanel>
            )}
        </>
    )
}
