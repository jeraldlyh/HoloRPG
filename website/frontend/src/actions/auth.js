import axiosInstance from "../axios"

import { USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./types"


// LOGIN USER
export const loginUser = ({username, password}) => async dispatch => {
    dispatch({type: USER_LOADING})

    const body = JSON.stringify({username, password})

    Promise.all([
        axiosInstance.post("/api/token/", body),
        axiosInstance.post("/auth/login/", body)
    ]).then(function onSuccess([ token, user ]) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: Object.assign({}, token.data, user.data)
        })
    }).catch(error => {
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

// REGISTER USER
export const registerUser = ({username, email, password}) => async dispatch => {
    const body = JSON.stringify({username, email, password})
    const tokenBody = JSON.stringify({username, password})
    const responseData = {}

    axiosInstance.post("/auth/register/", body)
        .then((response) => {
            Object.assign(responseData, response.data)
        })
        .then(() => {
            axiosInstance.post("/api/token/", tokenBody)
                .then((response) => {
                    Object.assign(responseData, response.data)
                })
        })
        .then(() => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: responseData
            })
        })
        .catch(error => {
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// LOGOUT USER
export const logoutUser = () => async(dispatch) => {
    const body = {refresh_token: localStorage.getItem("refresh_token")}

    axiosInstance.post("/auth/logout/", body)
        .then(() => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(error => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
}