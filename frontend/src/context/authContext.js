import { createContext, useContext, useState, useEffect } from "react"
import axiosInstance from "../axios/axiosInstance"
import { useRouter } from "next/router"
import _ from "lodash"

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const AUTHORIZED_PATHS = ["/login", "/register"]

export const AuthProvider = (props) => {
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(true)        // Change to false
    const [accessToken, setAccessToken] = useState("")
    const [accessTokenExpiry, setAccessTokenExpiry] = useState("")
    const router = useRouter()

    const resetAuthentication = () => {
        setIsAuthenticated(false)
        setAccessToken("")
        setAccessTokenExpiry("")
        setUsername("")
    }

    const setNewToken = (data) => {
        setAccessToken(data.access)
        setAccessToken(data.access_expiry)
        setIsAuthenticated(true)
    }

    const initializeAuth = async () => {
        setIsLoading(true)
        if (!isAccessTokenValid()) {
            await refreshToken()
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (!(_.includes(AUTHORIZED_PATHS, router.pathname))) {
            initializeAuth()        // Checks for expiry of token upon each load
        }
    }, [])

    const refreshToken = async () => {
        try {
            setIsLoading(true)
            console.log("Refreshing access token")
            const response = await axiosInstance.post("/token/refresh/")
            if (!response.ok) {             // Refresh token has expired
                console.log("Failed to refresh token")
                resetAuthentication()
            } else {
                setNewToken(response.data)
            }
            setIsLoading(false)
        } catch (error) {
            resetAuthentication()
        }
    }

    const isAccessTokenValid = () => {
        if (!accessToken) {
            return false
        }
        const now = new Date().getTime() / 1000
        return now > accessTokenExpiry
    }

    const loginUser = async (username, password) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post("auth/login/", { username, password })
            console.log(response)
            if (response.status === 200) {
                setUsername(username)
                setNewToken(response.data)
            } else {
                resetAuthentication()
            }
            setIsLoading(false)
        } catch (error) {
            throw error
        }
    }

    const registerUser = async (username, password, email) => {
        try {
            await axiosInstance.post({ username: username, password: password, email: email })
        } catch (error) {
            throw error
        }

    }

    const logoutUser = async () => {
        try {
            await axiosInstance.post("auth/logout/")
            resetAuthentication()
        } catch (error) {
            throw error
        }
    }

    const getToken = async () => {
        if (isAccessTokenValid()) {
            return accessToken
        }
        await refreshToken()
        return accessToken
    }

    return (
        <AuthContext.Provider value={{
            username,
            isAuthenticated,
            loginUser,
            logoutUser,
            registerUser,
            getToken
        }}>
            {!isLoading && props.children}
        </AuthContext.Provider>
    )
}