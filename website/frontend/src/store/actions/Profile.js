import axiosInstance from "../../axios/AxiosInstance"

import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_ERROR, GET_ALL_PROFILE_ERROR } from "../Types"

export const getProfile = (username) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/api/profile/${username}`)
        dispatch({
            type: LOAD_PROFILE_SUCCESS,
            payload: response.data
        })
        return response
    } catch (error) {
        console.log("Error in getProfile", error)
        dispatch({
            type: LOAD_PROFILE_ERROR,
            payload: error.response.data
        })
    }
}

export const getAllProfile = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/api/profile")
        return response
    } catch (error) {
        console.log("Erorr in getAllProfile", error)
        dispatch({
            type: GET_ALL_PROFILE_ERROR,
            payload: error.response.data
        })
    }
}