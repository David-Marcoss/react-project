import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { createContext } from "react"
import { AuthService, IAuthData } from "../services/api/auth/AuthService"
import { useNavigate } from "react-router-dom"


interface IAuthContextProps {
    isAuthenticated: boolean,
    authToken: string | undefined
    login: (data: IAuthData) => Promise<string | undefined>
    logout: () => void
}
interface IAuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext({} as IAuthContextProps)

const LOCAL_STRORAGE_KEY__AUTH_TOKEN = "APP_KEY_AUTH_TOKEN"

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string>()

    useEffect(() =>{
        const token = localStorage.getItem(LOCAL_STRORAGE_KEY__AUTH_TOKEN)

        if(token) setAuthToken(token)
        else handleLogout()
        
    },[authToken])
    

    const handleLogin = useCallback(async ( data: IAuthData)=>{
        const result = await AuthService.auth(data)

        if(result instanceof Error) return result.message

        setAuthToken(result.authToken)
        
        localStorage.setItem(LOCAL_STRORAGE_KEY__AUTH_TOKEN, JSON.stringify(authToken))
        
    },[authToken])

    const handleLogout = useCallback(()=>{
        setAuthToken(undefined)
        localStorage.removeItem(LOCAL_STRORAGE_KEY__AUTH_TOKEN)
    },[])

    const isAuthenticated = useMemo(():boolean => !!authToken, [authToken])

    return (
        <AuthContext.Provider value={{login: handleLogin, logout:handleLogout, authToken, isAuthenticated}}>
        { children }
       </AuthContext.Provider >
    )
}

export const useAuthContext = () => useContext(AuthContext)