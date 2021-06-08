import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL, LOGOUT_SUCCESS } from "../types"

const initialState = {
    profile: null
}

export const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            }
        case LOGOUT_SUCCESS:
        case LOAD_PROFILE_FAIL:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}