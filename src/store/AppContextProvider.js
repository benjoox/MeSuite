import React, { useState } from 'react'

export const AppContext = React.createContext('AppContext')

export default function AppContextProvider({ children }) {
    const [modeIsOnline, switchMode] = useState(false) // false correspond to offline

    React.useEffect(() => {
        let userChosenMode = localStorage.getItem('user-chosen-mode')
        if (userChosenMode) {
            localStorage.setItem('user-chosen-mode', modeIsOnline)
            userChosenMode = JSON.parse(
                localStorage.getItem('user-chosen-mode')
            )
        }
        switchMode(userChosenMode)
    }, [modeIsOnline])

    return (
        <AppContext.Provider value={{ modeIsOnline, switchMode }}>
            {children}
        </AppContext.Provider>
    )
}
