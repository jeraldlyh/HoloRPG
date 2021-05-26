import axios from "axios"

const baseURL = "http://127.0.0.1:8000"

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Authorization": localStorage.getItem("access_token") 
            ? "Bearer" + localStorage.getItem("access_token") 
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

        if (  // Prevent it from going into infite loop
			error.response.status === 401 &&
			originalRequest.url === baseURL + '/api/token/refresh/'
		) {
            console.log("Refresh token is no longer valid")
            return Promise.reject(error)
        }

        if (
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            const refreshToken = localStorage.getItem("refresh_token")

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]))         // Retrieves the time of the token
                
                const now = Math.ceil(Date.now() / 1000)
				console.log(tokenParts.exp)

                if (tokenParts.exp > now) {
                    axiosInstance.post("/api/token/refresh/", { refresh_token: refreshToken })
                        .then((response) => {
                            if (response.status === 201) {
                                localStorage.setItem("access_token", response.data.access)
                                localStorage.setItem("refresh_token", response.data.refresh)

                                axiosInstance.defaults.headers["Authorization"] = "Bearer" + response.data.access
                                originalRequest.defaults.headers["Authorization"] = "Bearer" + response.data.access
                                console.log("Refreshed token")

                                return axiosInstance(originalRequest)
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now)
                }
            } else {
                console.log("Refresh token not available")
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance