import useSWR from "swr"
import { useAuth } from "./useAuth"


export const useShop = () => {
    const { session, loading } = useAuth()
    const { data, error } = useSWR(["/api/entity", session.accessToken])

    return {
        data: data,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}