import axiosInstance from "../../axios/AxiosInstance"
import { CLAIM_INCOME_ERROR, GET_ENTITY_LIST_ERROR, GET_USER_ENTITY_ERROR } from "../Types"

export const claimIncome = (user, amount) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const body = {
            user: user,
            amount: amount
        }
    
        axiosInstance.post("/api/income/", body)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                dispatch({
                    type: CLAIM_INCOME_ERROR,
                    payload: error.response.data
                })
                reject(error)
            })
    })
}

export const getEntityList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get("/api/entity")
            .then(response => resolve(response))
            .catch(error => {
                dispatch({
                    type: GET_ENTITY_LIST_ERROR,
                    payload: error.response.data
                })
                reject(error)
            })
    })
}

export const getUserEntity = (username) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/api/userentity/${username}`)
            .then(response => resolve(response))
            .catch(error => {
                dispatch({
                    type: GET_USER_ENTITY_ERROR,
                    payload: error.response.data
                })
                reject(error)
            })
    })
}