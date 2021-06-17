import axiosInstance from "../../axios/AxiosInstance"
import { ATTACK_PLAYER_ERROR } from "../Types"

export const attackPlayer = (bountyID, body) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosInstance.patch(`/api/bounty/${bountyID}/`, body)
            .then(response => resolve(response))
            .catch(error => {
                dispatch({
                    type: ATTACK_PLAYER_ERROR,
                    payload: error.response.data
                })
                reject(error)
            })
    })
}