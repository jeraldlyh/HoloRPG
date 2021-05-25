import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL, LOGOUT_SUCCESS } from "../actions/types"

const initialState = {
    profile: null
}

export default function(state=initialState, action) {
    switch (action.type) {
        case LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            }
        case LOGOUT_SUCCESS:
        case LOAD_PROFILE_FAIL:
            localStorage.removeItem("token")
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}