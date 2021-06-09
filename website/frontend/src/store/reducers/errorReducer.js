import { LOAD_PROFILE_FAIL, REGISTER_FAIL, LOGIN_FAIL, HIDE_ERROR, SHOW_ERROR, RESET_ERROR } from "../types"


const initialState = {
    error: null,
    showError: false,
}

export const errorReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOAD_PROFILE_FAIL:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            console.log(Object.values(action.payload))
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
