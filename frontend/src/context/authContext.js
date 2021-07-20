import { createContext, useContext, useState, useEffect, Fragment } from "react"
import axiosInstance from "../axios/axiosInstance"
import { useRouter } from "next/router"
import _ from "lodash"

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const AUTHORIZED_PATHS = ["/login", "/register"]

export const AuthProvider = (props) => {
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState("")
    const [accessTokenExpiry, setAccessTokenExpiry] = useState(null)
    const router = useRouter()

    const resetAuthentication = () => {
        setIsAuthenticated(false)
        setUsername("")
        setIsLoading(false)
    }

    const setNewToken = (data) => {
        setAccessToken(data.access)
        setAccessTokenExpiry(data.access_expiry)
        setIsAuthenticated(true)
        setIsLoading(false)
    }

    const initializeAuth = async () => {
        setIsLoading(true)
        if (!isAccessTokenValid()) {
            console.log("Invalid access token")
            await refreshToken()
        } else {
            setIsAuthenticated(true)
            setIsLoading(false)
        }
    }

    const permitCurrentPath = () => {
        return _.includes(AUTHORIZED_PATHS, router.pathname)
    }

    useEffect(() => {
        if (!permitCurrentPath()) {
            initializeAuth()        // Checks for expiry of token upon each load
        }
    }, [])

    const refreshToken = async () => {
        try {
            setIsLoading(true)
            console.log("Refreshing access token")
            const response = await axiosInstance.post("auth/token/refresh/")

            if (response.status !== 200) {             // Refresh token has expired
                console.log("Failed to refresh token")
                resetAuthentication()
                return
            }
            setNewToken(response.data)
            return response.data.access                 // Return token
        } catch (error) {
            resetAuthentication()
            router.push("/login")
        }
    }

    const isAccessTokenValid = () => {
        if (accessToken === "") {
            return false
        }
        const now = new Date().getTime() / 1000
        console.log("Check for expiry: ", now, accessTokenExpiry)
        return accessTokenExpiry > now
    }

    const loginUser = async (username, password) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post("auth/login/", { username, password })

            if (response.status === 200) {
                setUsername(username)
                setNewToken(response.data)
                router.push("/")
                return
            }
            resetAuthentication()
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
            router.push("/login")
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
            {
                (!isLoading || permitCurrentPath())
                    ? <Fragment>
                        {props.children}
                    </Fragment>
                    : <div>loading...</div>
            }
        </AuthContext.Provider>
    )
}