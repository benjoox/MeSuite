import React, { useContext } from 'react'
import MarketContextProvider, {
    MarketContext,
} from '../src/store/MarketContextProvider'
import OnboardingInstructionPanel from '../src/components/OnboardingInstructionPanel'
import MarketPage from '../src/components/MarketPage'

export default function Markets() {
    const value = useContext(MarketContext)

    return (
        <MarketContextProvider value={value}>
            <OnboardingInstructionPanel />
            <MarketPage />
        </MarketContextProvider>
    )
}
