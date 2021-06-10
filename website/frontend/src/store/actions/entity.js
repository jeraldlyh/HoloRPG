import axiosInstance from "../../axios/axiosInstance"
import { CLAIM_INCOME_ERROR } from "../types"

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