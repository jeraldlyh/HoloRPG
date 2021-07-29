import React, { Fragment } from "react"
import { GiSwordWound } from "react-icons/gi"
import moment from "moment"


function BountyList({ bountyData }) {
    return (
        <Fragment>
            <div className="flex justify-around mb-3">
                <span className="w-32 text-center font-semibold">NAME</span>
                <span className="w-20 text-center font-semibold">HP</span>
                <span className="w-32 text-center font-semibold">PLACED BY</span>
                <span className="w-36 text-center font-semibold">BOUNTY VALUE</span>
                <span className="w-20 text-center font-semibold">TIME</span>
                <span className="w-20 text-center font-semibold" />
            </div>
            <hr className="border-custom-color-grey w-full mt-1 mb-2" />
            {
                bountyData && bountyData.length !== 0
                    ? bountyData.map(bounty => {
                        return (
                            <div key={bounty.id} className="flex justify-around items-center text-sm my-2">
                                <p className="w-32 text-center">{bounty.target}</p>
                                <p className="w-20 text-center">{bounty.target_health.current_health}/{bounty.target_health.max_health}</p>
                                <p className="w-32 text-center">{bounty.placed_by}</p>
                                <p className="w-36 text-center font-semibold">
                                    <NumberFormat value={bounty.value} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                </p>
                                <p className="w-20 text-center text-gray-300 text-xs">{moment(bounty.placed_at).fromNow()}</p>
                                <button className="flex w-20 h-10 bg-custom-button-primary text-white font-bold py-2 px-4 rounded-lg justify-center items-center">
                                    <GiSwordWound size={16} />
                                </button>
                            </div>
                        )
                    })
                    : <p className="text-center">There's currently no bounties available</p>
            }
        </Fragment>
    )
}

export default BountyList