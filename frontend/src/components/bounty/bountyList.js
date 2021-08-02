import React, { Fragment, useState } from "react"
import { GiSwordWound } from "react-icons/gi"
import moment from "moment"
import NumberFormat from "react-number-format"
import axiosInstance from "../../axios"
import Button from "../button"


function BountyList({ bountyData, accessToken, username }) {
    const [isLoading, setIsLoading] = useState(false)

    const attackPlayer = async (bountyId) => {
        setIsLoading(true)
        axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = "Bearer " + accessToken
            return config
        })
        const response = await axiosInstance.patch(`/api/bounty/${bountyId}/`, { attacker: username })
        console.log(response)
    }

    return (
        <Fragment>
            <div className="flex justify-around mb-3 text-center font-semibold text-sm">
                <span className="w-1/6">NAME</span>
                <span className="w-1/7">HP</span>
                <span className="w-1/6">PLACED BY</span>
                <span className="w-1/6">BOUNTY VALUE</span>
                <span className="w-1/6">TIME</span>
                <span className="w-1/7" />
            </div>
            <hr className="border-custom-color-grey w-full mt-1" />
            {
                bountyData && bountyData.length !== 0
                    ? bountyData.map((bounty, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div key={bounty.id} className={`flex justify-evenly items-center text-sm ${isEven ? "bg-custom-card-normal" : null}`} style={{ height: "9%" }}>
                                <div className="flex w-1/6 items-center justify-center">
                                    <div className="w-10">
                                        <div className="w-10 h-10 bg-custom-color-grey rounded-full"></div>
                                    </div>
                                    <div className="w-16 ml-4">
                                        <span>{bounty.target}</span>
                                    </div>
                                </div>

                                <span className="w-1/7 text-center">{bounty.target_health.current_health}/{bounty.target_health.max_health}</span>

                                <div className="flex w-1/6 items-center justify-center">
                                    <div className="w-10 h-10 bg-custom-color-grey rounded-full mr-4"></div>
                                    <span className="text-center">{bounty.placed_by}</span>
                                </div>
                                <span className="w-1/6 text-center font-semibold">
                                    <NumberFormat value={bounty.value} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                </span>
                                <span className="w-1/6 text-center text-gray-300 text-xs">{moment(bounty.placed_at).fromNow()}</span>
                                <div className="flex items-center justify-center w-1/7">
                                    <Button width="3/4" height="10" text={<GiSwordWound size={16} />} background={true} onClick={() => attackPlayer(bounty.id)}/>
                                </div>
                            </div>
                        )
                    })
                    : <span className="text-center">There's currently no bounties available</span>
            }
        </Fragment>
    )
}

export default BountyList