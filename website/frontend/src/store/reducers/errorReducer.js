import {
    LOAD_PROFILE_ERROR,
    REGISTER_FAIL,
    LOGIN_FAIL,
    HIDE_ERROR,
    SHOW_ERROR,
    RESET_ERROR,
    GET_RELATIONSHIP_ERROR,
    CLAIM_INCOME_ERROR,
    ATTACK_PLAYER_ERROR,
    GET_ALL_PROFILE_ERROR
} from "../types"


const initialState = {
    error: null,
    showError: false,
}

export const errorReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOAD_PROFILE_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case GET_RELATIONSHIP_ERROR:
        case CLAIM_INCOME_ERROR:
        case ATTACK_PLAYER_ERROR:
        case GET_ALL_PROFILE_ERROR:
            return {
                error: Object.values(action.payload).join("\r\n"),
                showError: true
            }
        case SHOW_ERROR:
            return {
                ...state,
                showError: true
            }
        case RESET_ERROR:
        case HIDE_ERROR:
            return {
                error: null,
                showError: false
            }
        default:
            return state
    }
}
