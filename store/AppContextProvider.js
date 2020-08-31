import React, { useState } from 'react'

export const AppContext = React.createContext('AppContext')

export default function AppContextProvider({ children }) {
    const [mode, switchMode] = useState(false) // false correspond to offline

    return (
        <AppContext.Provider value={{ mode, switchMode }}>
            {children}
        </AppContext.Provider>
    )
}
