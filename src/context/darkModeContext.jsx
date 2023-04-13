import {useState, createContext, useEffect} from 'react'

export const DarkModeContext = createContext();

export function DarkModeContextProvider({children}) {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

    function toggle() {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode])

    return (
        <DarkModeContext.Provider value={{darkMode,toggle}}>
            {children}
        </DarkModeContext.Provider>
    )
}