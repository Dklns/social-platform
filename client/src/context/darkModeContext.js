import { useState, createContext, useEffect } from 'react';

export const DarkModeContext = createContext();

export function DarkModeContextProvider({ children }) {
    const [darkMode, setDarkMod] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);

    const toggle = () => {
        setDarkMod(!darkMode);
    }

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggle }} >
            {children}
        </ DarkModeContext.Provider>
    )
}