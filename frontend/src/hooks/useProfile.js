import useSWR from "swr"

export const useAuth = (refreshInterval) => {
    const { data, error } = useSWR(SESSION_URL, fetchSession, {
        revalidateOnFocus: true,
        revalidateOnMount: true,
        revalidateOnReconnect: true,
        refreshInterval: refreshInterval * 1000 || 30 * 1000          // Default 30 seconds
    })

    return {
        session: data,
        loading: typeof data === "undefined" && typeof error === "undefined"
    }
}