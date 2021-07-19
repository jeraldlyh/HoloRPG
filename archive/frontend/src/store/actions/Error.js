import { HIDE_ERROR, RESET_ERROR } from "../Types"

export const showError = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: SHOW_ERROR
        })
        resolve()
    })
}

export const hideError = () => dispatch => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            dispatch({
                type: HIDE_ERROR
            })
        }, 500)
        
        resolve()
    })
}

export const resetError = () => dispatch => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            dispatch({
                type: RESET_ERROR
            })
        }, 500)
        resolve()
    })
}