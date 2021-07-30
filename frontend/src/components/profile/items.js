import React from "react"
import Card from "../card"
import ItemCard from "./itemCard"
import { IoMdCube } from "react-icons/io"
import { RiHeartPulseFill } from "react-icons/ri"
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi"

function Items({ setRef }) {
    return (
        <Card setRef={setRef} height="auto" width="auto" title="Items" icon={<IoMdCube />}>
            <div className="flex">
                <div className="flex flex-col w-auto ">
                    {/* Enhancements */}
                    <span className="text-xs text-custom-color-lightgrey mb-3">Total enhancements</span>
                    <div className="flex items-center h-auto space-x-6 mb-6">
                        <div className="flex flex-col items-center justify-center">
                            <RiHeartPulseFill size={24} />
                            <span className="text-sm mt-2.5">+62</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <GiPiercingSword size={24} />
                            <span className="text-sm mt-2.5">+30</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <GiCheckedShield size={24} />
                            <span className="text-sm mt-2.5">+120</span>
                        </div>
                    </div>

                    {/* Total Items */}
                    <div className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey mb-1">Total items</span>
                        <span className="text-xl font-semibold">12</span>
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
