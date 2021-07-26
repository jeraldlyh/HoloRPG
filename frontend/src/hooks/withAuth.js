import { useRouter } from "next/router"
import React from "react"
import { useAuth } from "./useAuth"

export const withAuth = (refreshInterval) => {
    return function (Component) {
        return function (props) {
            const { session, loading } = useAuth(refreshInterval)
            const router = useRouter()

            if (typeof window !== undefined && loading) {
                return <div className="flex justify-center items-center">LOADING IN HOC</div>
            }

            if (!loading && !session) {
                router.push("/login")
                return
            }
            return <Component session={session} {...props} />
        }
    }
}