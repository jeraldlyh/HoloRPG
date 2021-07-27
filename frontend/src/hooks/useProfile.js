import useSWR from "swr"
import { useAuth } from "./useAuth"


export const useProfile = () => {
    const { session, loading } = useAuth()
    const { data, error, mutate } = useSWR([`/api/profile/${session.user.username}`, session.accessToken], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshInterval: 0
    })

    return {
        data: data,
        mutate: mutate,
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