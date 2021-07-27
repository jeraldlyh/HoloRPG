import React, { useEffect } from "react"
import NumberFormat from "react-number-format"
import Layout from "../components/layout"
import Items from "../components/profile/items"
import Statistics from "../components/profile/statistics"
import Stocks from "../components/profile/stock"
import Entities from "../components/profile/entities"
import Button from "../components/button"
import { useProfile } from "../hooks/useProfile"
import { useEntity } from "../hooks/useEntity"

function Profile() {
    const { statistics, loading: profileLoading } = useProfile()
    const { entity, loading: entityLoading } = useEntity()


    const BannerTitle = () => {
        return (
            <div className="flex items-center text-white">
                <div className="w-14 h-14 border-2 rounded-full border-custom-color-grey bg-custom-color-darkblue p-3 items-center justify-center">
                    <img src="/assets/avatars/fighter.svg" alt="avatar" />
                </div>
                <p className="flex flex-col ml-2">
                    <span className="text-lg font-bold">Player Name</span>
                    <span className="text-custom-stats-net_worth font-semibold">
                        N.W. <NumberFormat value={"1992321"} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                    </span>
                </p>
                <div className="ml-4">
                    <Button width="auto" height="8" text="Place bounty" background={true} />
                </div>
            </div>
        )
    }

    return (
        <Layout title={<BannerTitle />}>
            <div className="flex flex-col">
                <p className="text-white font-semibold m-5 space-x-12">
                    <span className="">Overview</span>
                    <span className="text-custom-misc-inactive">Stocks</span>
                    <span className="text-custom-misc-inactive">Entities</span>
                    <span className="text-custom-misc-inactive">Battles</span>
                </p>

                <div className="flex flex-col w-full h-full gap-y-3 overflow-y-auto scrollbar-hide">
                    <Statistics data={statistics} />
                    <Items />
                    <Stocks />
                    <Entities data={entity} />
                </div>
            </div>
        </Layout>
    )
}

export default Profile