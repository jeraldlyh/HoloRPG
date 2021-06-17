import axiosInstance from "../../axios/AxiosInstance"
import { GET_RELATIONSHIP_ERROR } from "../Types"

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