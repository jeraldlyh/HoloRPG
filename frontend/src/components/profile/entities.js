import React from "react"
import NumberFormat from "react-number-format"
import Card from "../card"
import { FaCoins } from "react-icons/fa"
import EntityCard from "./entityCard"
import _ from "lodash"

function Entities({ entityData, setRef }) {
    const getNumberOfEntities = () => {
        return _.sumBy(entityData, "quantity")
    }

    const getTotalIncome = () => {
        return _.sumBy(entityData, function (o) {
            return o.quantity * o.income
        })
    }

    return (
        <Card setRef={setRef} height="auto" width="auto" title="Entities" icon={<FaCoins />}>
            <div className="flex flex-col">
                {/* Summary */}
                <div className="flex gap-x-10">
                    <div className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Total income per hour</span>
                        <span className="text-lg font-semibold">
                            <NumberFormat value={getTotalIncome()} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Number of entities</span>
                        <span className="text-lg font-semibold">{getNumberOfEntities()}</span>
                    </div>
                </div>
            </div>
            <hr className="border-custom-color-grey w-full my-4"></hr>

            {/* Entities */}
            <div className="flex flex-wrap h-40 pr-4 gap-x-3 gap-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                {
                    entityData && entityData.length !== 0
                        ? entityData.map((item, index) => {
                            return <EntityCard key={index} name={item.entity} income={item.income} />
                        })
                        : null
                }
            </div>
        </Card>
    )
}

export default Entities
