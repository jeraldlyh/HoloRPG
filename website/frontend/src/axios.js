import axios from "axios"
import { createBrowserHistory } from "history"
import { configureStore } from "./storeConfig"
import { logoutUser } from "./actions/auth"

const baseURL = "http://127.0.0.1:8000"
const { store } = configureStore()
const router = createBrowserHistory()

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Authorization": localStorage.getItem("access_token") 
            ? "Bearer " + localStorage.getItem("access_token") 
            : null,
        "Content-Type": "application/json",
        "accept": "application/json",
    }
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error) {
        const originalRequest = error.config

        if (  // Prevent it from going into infinite loop
			error.response.status === 401 &&
			originalRequest.url === baseURL + '/api/token/refresh/'
		) {
            console.log("Refresh token is no longer valid")
            router.push("/login")
            return Promise.reject(error)
        }

        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            const refreshToken = localStorage.getItem("refresh_token")

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]))         // Retrieves the time of the token
                
                const now = Math.ceil(Date.now() / 1000)

                if (tokenParts.exp > now) {
                    axiosInstance.post("/api/token/refresh/", { refresh: refreshToken })
                        .then((response) => {
                            if (response.status === 200) {
                                localStorage.setItem("access_token", response.data.access)
                                // localStorage.setItem("refresh_token", response.data.refresh)

                                axiosInstance.defaults.headers["Authorization"] = "Bearer" + response.data.access
                                originalRequest.headers["Authorization"] = "Bearer" + response.data.access
                                console.log("Refreshed token")

                                return axiosInstance(originalRequest)
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    store.dispatch(logoutUser())
                    console.log("Refresh token is expired", tokenParts.exp, now)
                }
            } else {
                console.log("Refresh token not available")
            }
        }
        router.push("/login")
        return Promise.reject(error)
    }
)

export default axiosInstance