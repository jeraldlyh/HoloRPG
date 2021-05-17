import axios from "axios"

import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL } from "./types"

export const tokenConfig = getState => {
    const token = getState().auth.token
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }
    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    return config
}


// GET PROFILE
export const getProfile = (user_id) => async(dispatch, getState) => {

    try {
        const response = await axios.get(`/api/profile/${user_id}`, tokenConfig(getState))
        dispatch({
            type: LOAD_PROFILE_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: LOAD_PROFILE_FAIL
        })
    }
}