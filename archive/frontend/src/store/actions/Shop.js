import axiosInstance from "../../axios/AxiosInstance"
import { PURCHASE_ENTITY_ERROR } from "../Types"

export const purchaseEntity = (user, entityName, quantity) => async (dispatch) => {
    try {
        const body = {
            user: user,
            entity: entityName,
            quantity: quantity
        }
        const response = axiosInstance.post("/api/entity/purchase/", body)
        return response
    } catch (error) {
        console.log("Error in purchaseEntity")
        dispatch({
            type: PURCHASE_ENTITY_ERROR
        })
    }
}