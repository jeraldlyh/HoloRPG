import axiosInstance from "../../axios/axiosInstance"
import { GET_RELATIONSHIP_ERROR } from "../types"

export const getRelationship = (username) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/api/relationship/${username}`)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                dispatch({
                    type: GET_RELATIONSHIP_ERROR,
                    payload: error.response.data
                })
                reject(error)
            })
    })
}