import axios from "axios"

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./types"


export const tokenConfig = getState => {
    const token = getState().auth.token
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    return config
}


// LOAD USER
export const loadUser = () => async(dispatch, getState) => {
    dispatch({type: USER_LOADING})
    
    try {
        const response = await axios.get("/auth/user", tokenConfig(getState))
        dispatch({
            type: USER_LOADED,
            payload: response.payload
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// LOGIN USER
export const loginUser = ({username, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    const body = JSON.stringify({username, password})

    try {
        const response = await axios.post("/auth/login", body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// REGISTER USER
export const registerUser = ({username, email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    const body = JSON.stringify({username, email, password})

    try {
        const response = await axios.post("/auth/register", body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// LOGOUT USER
export const logoutUser = () => async(dispatch, getState) => {
    await axios.post("/auth/logout", null, tokenConfig(getState))
    dispatch({
        type: LOGOUT_SUCCESS
    })
}