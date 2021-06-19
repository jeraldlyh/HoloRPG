import axiosInstance from "../../axios/AxiosInstance"
import { GET_STOCK_PRICE_ERROR, GET_ALL_STOCKS_ERROR } from "../Types"

export const getAllStocks = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("api/stock")
        return response
    } catch (error) {
        console.log("Error in getAllStocks")
        dispatch({
            type: GET_ALL_STOCKS_ERROR
        })
    }
}

export const getStockData = (company) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/api/stockprice/${company}`)
        return response
    } catch (error) {
        console.log("Error in getStockData")
        dispatch({
            type: GET_STOCK_PRICE_ERROR
        })
    }
}