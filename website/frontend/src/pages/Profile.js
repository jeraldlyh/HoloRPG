import React from "react"
import NumberFormat from "react-number-format"
import Layout from "../components/Layout"
import Items from "../components/profile/Items"
import Statistics from "../components/profile/Statistics"
import Stocks from "../components/profile/Stock"
import Entities from "../components/profile/Entities"
import Button from "../components/Button"
import fighterIcon from "../assets/avatars/fighter.svg"

function Profile() {
    const BannerTitle = () => {
        return (
            <div className="flex items-center text-white">
                <div className="w-14 h-14 border-2 rounded-full border-custom-color-grey bg-custom-color-darkblue p-3 items-center justify-center">
                    <img src={fighterIcon} alt="avatar" />
                </div>
                <p className="flex flex-col ml-2">
                    <span className="text-lg font-bold">Player Name</span>
                    <span className="text-custom-stats-net_worth font-semibold">
                        N.W. <NumberFormat value={"1992321"} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                    </span>
                </p>
                <div className="ml-4">
                    <Button width="auto" height="8" text="Place bounty" />
                </div>
            </div>
        )
    }

    return (
        <Layout title={<BannerTitle />}>
            <div className="flex flex-col">
                <div className="text-white font-semibold m-5 space-x-12">
                    <span className="">Overview</span>
                    <span className="text-custom-misc-inactive">Stocks</span>
                    <span className="text-custom-misc-inactive">Entities</span>
                    <span className="text-custom-misc-inactive">Battles</span>
                </div>

                <div className="flex flex-col w-full h-full gap-y-3 overflow-y-auto scrollbar-hide">
                    <Statistics />
                    <Items />
                    <Stocks />
                    <Entities />
                </div>
            </div>
        </Layout>
    )
}

export default Profile