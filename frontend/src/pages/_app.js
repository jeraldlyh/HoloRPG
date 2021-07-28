import { SWRConfig } from "swr"
import axios from "axios"
import { withAuth } from "../hooks/withAuth"
import "../styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const fetcher = async (endpoint, token) => {
    try {
        const response = await axios.get(BASE_URL + endpoint, {
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


function MyApp({ Component, pageProps, session }) {
    return (
        <SWRConfig value={{
            fetcher: fetcher,
        }}>
            <Component session={session} {...pageProps} />
        </SWRConfig>
    )
}

export default withAuth()(MyApp)
