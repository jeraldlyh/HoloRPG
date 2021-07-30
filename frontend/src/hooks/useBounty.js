import useSWR from "swr"


export const useBounty = (token) => {
    const { data, error } = useSWR(["/api/bounty", token], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        dedupingInterval: 2000,
        refreshInterval: 2 * 60 * 1000      // 2 minutes
    })

    return {
        bountyData: data ? data.bounty : null,
        playerData: data ? data.player : null,
        lastUpdated: data ? data.lastUpdated : null,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}