import { withAuth } from "../hooks/withAuth"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    )
}

export default withAuth(60)(MyApp)
