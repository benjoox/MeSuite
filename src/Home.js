import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import MePortfolio from './components/Home'
import MeFinance from './meFinance/App'


export default function Home () {
    const [comp, setComp] = useState(null)
    const { user } = useAuth0()

    return (
        <>
            <h2>Hello {user.nickname}</h2>
            <button onClick={() => setComp('meFinance')}>MeFinance</button>
            <button onClick={() => setComp('mePortfolio')}>MePortfolio</button>
            { comp === 'meFinance' ? <MeFinance /> : '' }
            { comp === 'mePortfolio' ? <MePortfolio /> : '' }
        </>
    )
}