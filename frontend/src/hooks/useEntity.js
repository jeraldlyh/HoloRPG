import useSWR from "swr"
import { useAuth } from "./useAuth"


export const useEntity = () => {
    const { session, loading } = useAuth()
    const { data, error, mutate } = useSWR([`/api/entity/${session.user.username}`, session.accessToken], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshInterval: 0
    })

    return {
        entities: data,
        mutate: mutate,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}