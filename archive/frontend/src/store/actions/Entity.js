import axiosInstance from "../../axios/AxiosInstance"
import { CLAIM_INCOME_ERROR, GET_ENTITY_LIST_ERROR, GET_USER_ENTITY_ERROR } from "../Types"

export const claimIncome = (user, amount) => async (dispatch) => {
    try {
        const body = {
            user: user,
            amount: amount
        }
        const response = await axiosInstance.post("/api/income/", body)
        return response
    } catch (error) {
        console.log("Error in claimIncome", error)
        dispatch({
            type: CLAIM_INCOME_ERROR,
            payload: error.response.data
        })
        
    }
}

export const getEntityList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/api/entity")
        return response
    } catch (error) {
        console.log("Error in getEntityList", error)
        dispatch({
            type: GET_ENTITY_LIST_ERROR,
            payload: error.response.data
        })
    }
}

export const getUserEntity = (username) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/api/userentity/${username}`)
        return response
    } catch (error) {
        console.log("User does not own any entities", error)
    }
}