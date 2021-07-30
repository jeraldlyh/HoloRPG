import useSWR from "swr"

export const useRelationship = (username, token) => {
    const { data, error } = useSWR([`/api/relationship/${username}`, token], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        dedupingInterval: 2000,
        refreshInterval: 0
    })

    return {
        data: data,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}