import React, { useState, useRef, useEffect } from "react"
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
    const { entities, loading: entityLoading } = useEntity()
    const [currentIndex, setCurrentIndex] = useState(0)
    const statsRef = useRef(null)
    const itemsRef = useRef(null)
    const stocksRef = useRef(null)
    const entitiesRef = useRef(null)

    const handleScrollView = (ref) => {
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
        })
    }

    const executeScroll = (index) => {
        switch (index) {
            case 0:
                handleScrollView(statsRef)
                setCurrentIndex(0)
                break
            case 1:
                handleScrollView(itemsRef)
                setCurrentIndex(1)
                break
            case 2:
                handleScrollView(stocksRef)
                setCurrentIndex(2)
                break
            case 3:
                handleScrollView(entitiesRef)
                setCurrentIndex(3)
                break
            default:
                break
        }
    }

    const getFocusDesign = (index) => {
        if (index === currentIndex) {
            return "text-white"
        }
        return "text-custom-misc-inactive"
    }

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
                <p className="font-semibold m-5 space-x-12">
                    <span className={getFocusDesign(0)} onClick={() => executeScroll(0)}>Overview</span>
                    <span className={getFocusDesign(1)} onClick={() => executeScroll(1)}>Items</span>
                    <span className={getFocusDesign(2)} onClick={() => executeScroll(2)}>Stocks</span>
                    <span className={getFocusDesign(3)} onClick={() => executeScroll(3)}>Entities</span>
                </p>

                <div className="flex flex-col w-full h-full gap-y-3 overflow-y-auto scrollbar-hide">
                    <Statistics setRef={statsRef} data={statistics} />
                    <Items setRef={itemsRef} />
                    <Stocks setRef={stocksRef} />
                    <Entities setRef={entitiesRef} entityData={entities} />
                </div>
            </div>
        </Layout>
    )
}

export default Profile