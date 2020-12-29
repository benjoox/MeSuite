import React, { useState } from 'react'

export const AppContext = React.createContext('AppContext')

export default function AppContextProvider({ children }) {
    const [modeIsOnline, setModeIsOnline] = useState(false) // false correspond to offline

    React.useEffect(() => {
        let savedMode = localStorage.getItem('user-chosen-mode')
        if (!savedMode) {
            savedMode = localStorage.setItem('user-chosen-mode', modeIsOnline)
        }

        setModeIsOnline(JSON.parse(savedMode))
    }, [modeIsOnline])

    const switchMode = (mode) => {
        localStorage.setItem('user-chosen-mode', mode)
        setModeIsOnline(mode)
    }

    return (
        <AppContext.Provider value={{ modeIsOnline, switchMode }}>
            {children}
        </AppContext.Provider>
    )
}
