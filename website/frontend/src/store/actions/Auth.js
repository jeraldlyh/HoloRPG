import axiosInstance from "../../axios/AxiosInstance"
import { USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "../Types"


export const loginUser = ({ username, password }) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING })            // Shows loading bubble
        const body = JSON.stringify({ username, password })
        const responseData = {}

        const login = await axiosInstance.post("/auth/login/", body)
        Object.assign(responseData, login.data)

        const token = await axiosInstance.post("/api/token/", body)
        Object.assign(responseData, token.data)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        console.log("Error in loginUser", error)
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        })
    }
}

export const registerUser = ({ username, email, password }) => async (dispatch) => {
    try {
        const body = JSON.stringify({ username, email, password })
        const tokenBody = JSON.stringify({ username, password })
        const responseData = {}

        const register = axiosInstance.post("/auth/register/", body)
        Object.assign(responseData, register.data)

        const token = await axiosInstance.post("/api/token/", tokenBody)
        Object.assign(responseData, token.data)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        console.log("Error in registerUser", error)
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const body = { refresh_token: localStorage.getItem("refresh_token") }
        const logout = await axiosInstance.post("/auth/logout/", body)

        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {
        console.log("Error in logoutUser", error.response)
        dispatch({                                              // Force logout
            type: LOGOUT_SUCCESS
        })
    }
}