import useSWR from "swr"


export const useLeaderboard = (token) => {
    const { data, error } = useSWR(["/api/profile", token], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshInterval: 0
    })

    return {
        data: data,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}