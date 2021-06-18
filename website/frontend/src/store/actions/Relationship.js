import axiosInstance from "../../axios/AxiosInstance"
import { GET_RELATIONSHIP_ERROR } from "../Types"

export const getRelationship = (username) => async (dispatch) => {
    try {
        const response = axiosInstance.get(`/api/relationship/${username}`)
        return response
    } catch (error) {
        console.log("Error in getRelationship", error)
        dispatch({
            type: GET_RELATIONSHIP_ERROR,
            payload: error.response.data
        })
    }
}