import axiosInstance from "../../axios/AxiosInstance"
import { ATTACK_PLAYER_ERROR } from "../Types"

export const attackPlayer = (bountyID, body) => async (dispatch) => {
    try {
        const response = axiosInstance.patch(`/api/bounty/${bountyID}/`, body)
        return response
    } catch (error) {
        console.log("Error in attackPlayer", error)
        dispatch({
            type: ATTACK_PLAYER_ERROR,
            payload: error.response.data
        })
    }
}