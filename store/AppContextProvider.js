import React, { useState } from 'react'

export const AppContext = React.createContext('AppContext')

export default function AppContextProvider({ children }) {
    const [modeIsOnline, switchMode] = useState(false) // false correspond to offline
    return (
        <AppContext.Provider value={{ modeIsOnline, switchMode }}>
            {children}
        </AppContext.Provider>
    )
}
