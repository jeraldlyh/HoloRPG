import React from "react"
import NumberFormat from "react-number-format"
import Card from "../card"
import { FaCoins } from "react-icons/fa"
import EntityCard from "./entityCard"

function Entities() {
    return (
        <Card height="auto" width="auto" title="Entities" icon={<FaCoins />}>
            <div className="flex flex-col">
                {/* Summary */}
                <div className="flex gap-x-10">
                    <p className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Total income stacked</span>
                        <span className="text-lg font-semibold">
                            <NumberFormat value={"999888"} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                        </span>
                    </p>
                    <p className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Number of entities</span>
                        <span className="text-lg font-semibold">2</span>
                    </p>
                </div>
            </div>
            <hr className="border-custom-color-grey w-full my-4"></hr>

            {/* Entities */}
            <div className="flex flex-wrap h-40 pr-4 gap-x-3 gap-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <EntityCard name="Farm" value="1234" />
                <EntityCard name="Farm" value="1234" />
                <EntityCard name="Farm" value="1234" />
                <EntityCard name="Farm" value="1234" />
                <EntityCard name="Farm" value="1234" />
                <EntityCard name="Farm" value="1234" />
                <EntityCard name="Farm" value="1234" />
                <EntityCard name="Farm" value="1234" />
                <EntityCard name="Farm" value="1234" />
            </div>
        </Card>
    )
}

export default Entities
