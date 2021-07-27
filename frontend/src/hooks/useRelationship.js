import useSWR from "swr"
import { useAuth } from "./useAuth"

export const useRelationship = () => {
    const { session, loading } = useAuth()
    const { data, error } = useSWR([`/api/relationship/${session.user.username}`, session.accessToken], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    })

    return {
        data: data,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}