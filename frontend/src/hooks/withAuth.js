import { useRouter } from "next/router"
import React from "react"
import Error from "../pages/error"
import { useAuth } from "./useAuth"
import _ from "lodash"

const PERMITTED_URLS = ["/login", "/register"]

export const withAuth = (refreshInterval) => {
    return function (Component) {
        return function (props) {
            const { session, loading } = useAuth(refreshInterval)
            console.log("loading: ", loading)
            const router = useRouter()
            const isPermitted = _.includes(PERMITTED_URLS, router.pathname)

            if (!loading && !session && !(isPermitted)) {
                return <Error message={"You are not authorized here."} errorCode={401} action={() => router.push("/login")} />
            }

            if (typeof window !== undefined && loading) {
                return <div className="flex justify-center items-center">LOADING IN HOC</div>
            }

            return <Component session={session} {...props} />
        }
    }
}