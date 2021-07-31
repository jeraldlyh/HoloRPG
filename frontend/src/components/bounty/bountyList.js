import React, { Fragment, useState } from "react"
import { GiSwordWound } from "react-icons/gi"
import moment from "moment"
import NumberFormat from "react-number-format"
import axiosInstance from "../../axios"


function BountyList({ bountyData, accessToken }) {
    const [isLoading, setIsLoading] = useState(false)

    // const attackPlayer = (bountyId) => {
    //     setIsLoading(true)
    //     axiosInstance.interceptors.request.use(function (config) {
    //         config.headers.Authorization = "Bearer " + accessToken
    //         return config
    //     })
    //     axiosInstance.patch(`/api/bounty/${bountyId}/`, )
    // }

    return (
        <Fragment>
            <div className="flex justify-around mb-3">
                <span className="w-1/6 text-center font-semibold">NAME</span>
                <span className="w-1/6 text-center font-semibold">HP</span>
                <span className="w-1/6 text-center font-semibold">PLACED BY</span>
                <span className="w-1/6 text-center font-semibold">BOUNTY VALUE</span>
                <span className="w-1/6 text-center font-semibold">TIME</span>
                <span className="w-1/7" />
            </div>
            <hr className="border-custom-color-grey w-full mt-1 mb-2" />
            {
                bountyData && bountyData.length !== 0
                    ? bountyData.map((bounty, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div key={bounty.id} className={`flex justify-around items-center text-sm my-2 ${isEven ? "bg-custom-card-normal" : null}`} style={{ height: "9%" }}>
                                <span className="w-1/6 text-center">{bounty.target}</span>
                                <span className="w-1/6 text-center">{bounty.target_health.current_health}/{bounty.target_health.max_health}</span>
                                <span className="w-1/6 text-center">{bounty.placed_by}</span>
                                <span className="w-1/6 text-center font-semibold">
                                    <NumberFormat value={bounty.value} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                </span>
                                <span className="w-1/6 text-center text-gray-300 text-xs">{moment(bounty.placed_at).fromNow()}</span>
                                <button className="flex w-1/7 h-10 bg-custom-button-primary text-white font-bold py-2 px-4 rounded-lg justify-center items-center">
                                    <GiSwordWound size={16} />
                                </button>
                            </div>
                        )
                    })
                    : <span className="text-center">There's currently no bounties available</span>
            }
        </Fragment>
    )
}

export default BountyList