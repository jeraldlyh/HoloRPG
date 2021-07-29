import React, { Fragment } from "react"


function PlaceBounty({ playerData }) {
    return (
        <Fragment>
            <div className="flex justify-around items-center mb-3">
                <span className="w-1/6 text-center font-semibold">RANK</span>
                <span className="w-1/6 text-center font-semibold">NAME</span>
                <span className="w-1/6 text-center font-semibold">CHARACTER</span>
                <span className="w-1/6 text-center font-semibold">NET WORTH</span>
                <span className="w-1/6" />
            </div>
            <hr className="border-custom-color-grey w-full mt-1 mb-2" />
            <div className="flex flex-col h-full">
                {
                    playerData && playerData.length !== 0
                        ? playerData.map(player => {
                            return (
                                <div key={player.id} className="flex justify-around items-center text-sm" style={{ height: "10%" }}>
                                    <span className="w-1/6 text-center">#{player.rank}</span>
                                    <span className="w-1/6 text-center">{player.username}</span>
                                    <span className="w-1/6 text-center">{player.character ? player.character : "None"}</span>
                                    <span className="w-1/6 text-center">{player.net_worth}</span>
                                    <span className="w-1/6" />
                                </div>
                            )
                        })
                        : <p className="text-center">An error occurred</p>
                }
            </div>
        </Fragment>
    )
}

export default PlaceBounty