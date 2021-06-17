import axiosInstance from "../../axios/AxiosInstance"

import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_ERROR, GET_ALL_PROFILE_ERROR } from "../Types"

export const getProfile = (username) => (dispatch) => {
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
                    type: LOAD_PROFILE_ERROR,
                    payload: error.response.data
                })
                reject(error)
            })
    })
}

export const getAllProfile = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get("/api/profile")
            .then(response => resolve(response))
            .catch(error => {
                dispatch({
                    type: GET_ALL_PROFILE_ERROR,
                    payload: error.response.data
                })
                reject(error)
            })
    })
}