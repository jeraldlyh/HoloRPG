import useSWR from "swr"


export const useEntity = (username, token) => {
    const { data, error, mutate } = useSWR([`/api/entity/${username}`, token], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        dedupingInterval: 2000,
        refreshInterval: 0
    })

    return {
        data: data,
        mutate: mutate,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}