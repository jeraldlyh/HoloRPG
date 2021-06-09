import { HIDE_ERROR, RESET_ERROR } from "../types"

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
        dispatch({
            type: HIDE_ERROR
        })
        resolve()
    })
}

export const resetError = () => dispatch => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            dispatch({
                type: RESET_ERROR
            })
        }, 2000)
        resolve()
    })
}