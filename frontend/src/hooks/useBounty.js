import useSWR from "swr"


export const useBounty = (token) => {
    const { data, error } = useSWR(["/api/bounty", token], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshInterval: 10000
    })

    return {
        bountyData: data ? data.bounty : null,
        playerData: data ? data.player : null,
        lastUpdated: data ? data.lastUpdated : null,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}