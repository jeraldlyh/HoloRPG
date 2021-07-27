import useSWR from "swr"

const SESSION_URL = "/api/auth/session"

const fetchSession = async (url) => {
    const response = await fetch(SESSION_URL)

    if (!response.ok) {
        throw new Error(`Unable to fetch session from ${url}`)
    }
    const session = await response.json()

    if (!session || Object.keys(session).length === 0) {
        return null
    }
    return session
}

export const useAuth = () => {
    const { data, error } = useSWR(SESSION_URL, fetchSession, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 30 * 1000          // Default 30 seconds
    })

    return {
        session: data,
        loading: typeof data === "undefined" && typeof error === "undefined"
    }
}