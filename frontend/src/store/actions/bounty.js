import axiosInstance from "../../axios/AxiosInstance"
import { ATTACK_PLAYER_ERROR, GET_BOUNTY_LIST_ERROR } from "../Types"

export const getBountyList = () => async (dispatch) => {
    try {
        const response = axiosInstance.get("/api/bounty")
        return response
    } catch (error) {
        console.log("Error in getBountyList")
        dispatch({
            type: GET_BOUNTY_LIST_ERROR,
            payload: error.response.data
        })
    }
}

export const attackPlayer = (bountyID, body) => async (dispatch) => {
    try {
        const response = axiosInstance.patch(`/api/bounty/${bountyID}/`, body)
        return response
    } catch (error) {
        console.log("Error in attackPlayer")
        dispatch({
            type: ATTACK_PLAYER_ERROR,
            payload: error.response.data
        })
    }
}