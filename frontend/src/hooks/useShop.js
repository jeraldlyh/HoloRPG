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
        console.log("Error in useShop fetcher", error)
    }
}

export const useShop = () => {
    const { session, loading } = useAuth()
    const { data, error } = useSWR([BASE_URL + `/api/entity/`, session.accessToken], fetcher)

    return {
        data: data,
        loading: typeof data === "undefined" && typeof error === "undefined",
    }
}