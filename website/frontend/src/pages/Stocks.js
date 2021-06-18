import React, { useEffect, useState } from "react"
import { getStockData } from "../store/actions/Stock"
import StockChart from "../components/StockChart"

function Stock() {

    return (
        <div>
            <StockChart></StockChart>
        </div>
    )
}


export default Stock