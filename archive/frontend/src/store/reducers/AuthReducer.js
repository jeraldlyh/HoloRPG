import { USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "../Types"

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: null
}

export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("access_token", action.payload.access)
            localStorage.setItem("refresh_token", action.payload.refresh)
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.username
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}