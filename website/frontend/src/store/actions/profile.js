import axiosInstance from "../../axios/axiosInstance"

import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL } from "../types"

// GET PROFILE
export const getProfile = (username) => async(dispatch) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/api/profile/${username}`)
            .then(response => {
                dispatch({
                    type: LOAD_PROFILE_SUCCESS,
                    payload: response.data
                })
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: LOAD_PROFILE_FAIL,
                    payload: error.response.data
                })
                reject(error)
            })
    })
}