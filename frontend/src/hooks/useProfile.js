import useSWR from "swr"


export const useProfile = (username, token) => {
    const { data, error, mutate } = useSWR([`/api/profile/${username}`, token], {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        dedupingInterval: 2000,
        refreshInterval: 0
    })

    return {
        data: {
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
            last_collected: data ? data.last_collected : 0,
            experience: data ? data.experience : 0,
            exp_required: data ? data.exp_required : 0
        },
        mutate: mutate,
        loading: typeof data === "undefined" && typeof error === "undefined",
        error: error
    }
}