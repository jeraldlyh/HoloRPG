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
        console.log("Error in useProfile fetcher", error)
    }
}

export const useProfile = () => {
    const { session, loading } = useAuth()
    const { data, error } = useSWR([BASE_URL + `/api/profile/${session.user.username}`, session.accessToken], fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 60 * 5000          // Default 5 minutes
    })

    return {
        data: data,
        loading: typeof data === "undefined" && typeof error === "undefined",
        statistics: {
            username: data ? data.username : "",
            character: data ? data.character : "",
            attack: data ? data.attack : 0,
            defence: data ? data.defence : 0,
            current_health: data ? data.current_health : 0,
            max_health: data ? data.max_health : 0,
            net_worth: data ? data.net_worth : 0,
            currency: data ? data.currency : 0,
            level: data ? data.level : 0,
            reputation: data ? data.reputation : 0,
            account_age: data ? data.account_age : 0,
            income_accumulated: data ? data.income_accumulated : 0,
            last_collected: data ? data.last_collected : 0
        },
    }
}