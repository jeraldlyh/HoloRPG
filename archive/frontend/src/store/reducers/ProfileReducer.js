import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_ERROR, LOGOUT_SUCCESS } from "../Types"

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
        case LOAD_PROFILE_ERROR:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}