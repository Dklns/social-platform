import { useState,createContext,useEffect } from "react";
import { login as oriLogin, logout as oriLogout } from "../query/queries";

export const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

    async function login(inputs) {
        const res = await oriLogin(inputs);
        if(typeof res === 'object') {
            localStorage.setItem('currentUser', JSON.stringify(res));
            setCurrentUser(res);
            return 'success'
        }
        return res;
    }

    async function logout() {
        const res = await oriLogout();
        if(res === 'success') {
            setCurrentUser(null);
        }
        return res;
    }

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser,login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}