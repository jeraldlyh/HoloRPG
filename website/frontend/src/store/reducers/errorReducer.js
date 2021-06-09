import { LOAD_PROFILE_FAIL, REGISTER_FAIL, LOGIN_FAIL, HIDE_ERROR } from "../types"


const initialState = {
    error: null,
    showError: false,
}

export const errorReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOAD_PROFILE_FAIL:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                error: action.payload,
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
    }
}
