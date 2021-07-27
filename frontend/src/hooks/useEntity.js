import useSWR from "swr"
import axios from "axios"
import { useAuth } from "./useAuth"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const fetcher = async (url, token) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + token,
            }
        })
        return response.data
    } catch (error) {
        console.log("Error in useEntity fetcher", error)
    }
}

export const useEntity = () => {
    const { session, loading } = useAuth()
    const { data, error } = useSWR([BASE_URL + `/api/entity/${session.user.username}`, session.accessToken], fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 60 * 5000          // Default 5 minutes
    })

    return {
        data: data,
        loading: typeof data === "undefined" && typeof error === "undefined",
        entity: {
            
        },
    }
}