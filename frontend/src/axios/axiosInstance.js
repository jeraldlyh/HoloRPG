import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
    }
})

axiosInstance.defaults.withCredentials = true
export default axiosInstance