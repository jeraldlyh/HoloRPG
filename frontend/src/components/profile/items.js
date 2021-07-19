import React from "react"
import Card from "../card"
import ItemCard from "./itemCard"
import { IoMdCube } from "react-icons/io"
import { RiHeartPulseFill } from "react-icons/ri"
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi"

function Items() {
    return (
        <Card height="auto" width="auto" title="Items" icon={<IoMdCube />}>
            <div className="flex">
                <div className="flex flex-col w-auto ">
                    {/* Enhancements */}
                    <p className="text-xs text-custom-color-lightgrey mb-3">Total enhancements</p>
                    <div className="flex items-center h-auto space-x-6 mb-6">
                        <div className="flex flex-col items-center justify-center">
                            <RiHeartPulseFill size={24} />
                            <p className="text-sm mt-2.5">+62</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <GiPiercingSword size={24} />
                            <p className="text-sm mt-2.5">+30</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <GiCheckedShield size={24} />
                            <p className="text-sm mt-2.5">+120</p>
                        </div>
                    </div>

                    {/* Total Items */}
                    <div className="flex flex-col">
                        <p className="text-xs text-custom-color-lightgrey mb-1">Total items</p>
                        <p className="text-xl font-semibold">12</p>
                    </div>
                </div>

                <hr className="border-0 w-px bg-custom-color-grey h-40 ml-5" />

                {/* Add responsive gap-x-{n} */}
                <div className="flex flex-wrap gap-x-3 w-full ml-5 pr-4 h-40 gap-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                    <ItemCard name="test" health="100" attack="3" defence="3" />
                </div>
            </div>
        </Card>
    );
}

export default Items;
