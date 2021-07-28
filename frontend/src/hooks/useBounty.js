import useSWR from "swr"


export const useBounty = (token) => {
    const { data, error } = useSWR(["/api/bounty", token], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshInterval: 10000
    })

    return {
        data: data,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}