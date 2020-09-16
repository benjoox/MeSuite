import React, { useContext } from 'react'
import MarketContextProvider, {
    MarketContext,
} from '../store/MarketContextProvider'
import OnboardingInstructionPanel from '../components/OnboardingInstructionPanel'
import MarketPage from '../components/MarketPage'

export default function Markets() {
    const value = useContext(MarketContext)

    return (
        <MarketContextProvider value={value}>
            <OnboardingInstructionPanel />
            <MarketPage />
        </MarketContextProvider>
    )
}
