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
                return (
                    <div className="flex flex-col h-screen justify-center items-center">
                        <p>You are not authorized</p>
                        <div className="flex items-center justify-center space-x-1">
                            <p>CLICK</p>
                            <button className="font-bold text-xl" onClick={() => router.push("/login")}>
                                ME
                            </button>
                            <p>TO GO LOGIN PAGE</p>
                        </div>
                    </div>
                )
            }
            return <Component session={session} {...props} />
        }
    }
}