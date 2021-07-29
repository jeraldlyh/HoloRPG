import React, { useState, Fragment } from "react"
import Layout from "../components/layout"
import { useShop } from "../hooks/useShop"
import _ from "lodash"
import { useProfile } from "../hooks/useProfile"
import { useEntity } from "../hooks/useEntity"
import { useRelationship } from "../hooks/useRelationship"
import { useAuth } from "../hooks/useAuth"
import CardLight from "../components/cardLight"
import PurchaseModal from "../components/shop/purchaseModal"


function Shop() {
    const { session } = useAuth()
    const { accessToken, user: { username } } = session
    const { data: relationshipData, loading: relationshipLoading } = useRelationship(username, accessToken)
    const { data: profileData, loading: profileLoading, mutate: profileMutate } = useProfile(username, accessToken)
    const { data: entityData, loading: entityLoading, mutate: entityMutate } = useEntity(username, accessToken)
    const { data: shopData } = useShop(accessToken)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [showEntityModal, setShowEntityModal] = useState(false)
    const [purchaseData, setPurchaseData] = useState({
        itemName: "",
        itemImage: "",
        itemCost: 0,
        owned: ""
    })

    if (relationshipLoading || profileLoading || entityLoading) {
        return <div className="flex items-center justify-center">Loading...</div>
    }

    const handleEntityButton = (name, cost) => {
        setPurchaseData({
            itemName: name,
            itemImage: "",
            itemCost: cost,
        })
        setShowEntityModal(true)
    }

    const getFocusDesign = (index) => {
        if (index === currentIndex) {
            return "text-white cursor-default"
        }
        return "text-custom-misc-inactive cursor-pointer"
    }

    return (
        <Fragment>
            {
                showEntityModal
                    ? <PurchaseModal
                        itemData={purchaseData}
                        toggleModal={() => setShowEntityModal(false)}
                        profileData={profileData}
                        profileMutate={profileMutate}
                        entityData={entityData}
                        entityMutate={entityMutate}
                        accessToken={accessToken}
                    />
                    : null
            }
            <Layout
                profileData={profileData} profileMutate={profileMutate}
                relationshipData={relationshipData}
                accessToken={accessToken}
            >
                {/* Tabs */}
                <div className="relative flex flex-col w-full h-full overflow-y-auto scrollbar-hide">
                    <p className="text-white font-semibold m-5 space-x-12">
                        <span className={getFocusDesign(0)} onClick={() => setCurrentIndex(0)}>Entities</span>
                        <span className={getFocusDesign(1)} onClick={() => setCurrentIndex(1)}>Items</span>
                    </p>

                    {/* Shop */}
                    {
                        currentIndex === 0
                            ? (         // Entity Shop
                                <CardLight height="full" width="full">
                                    <div className="flex w-full items-center justify-around mb-3">
                                        <span className="w-12 text-center font-semibold">ITEM</span>
                                        <span className="w-40 text-center font-semibold">NAME</span>
                                        <span className="w-20 text-center font-semibold">INCOME</span>
                                        <span className="w-20 text-center font-semibold">UPKEEP</span>
                                        <span className="w-20 text-center font-semibold">COST</span>
                                        <span className="w-28 text-center font-semibold" />
                                    </div>

                                    <hr className="border-custom-color-grey w-full mt-1 mb-2" />

                                    <div className="flex flex-col w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                                        {
                                            shopData
                                                ? shopData.map((item, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <div className="flex w-full justify-around items-center text-sm my-2">
                                                                {/* <div className="w-12 h-12 bg-custom-color-lightgrey" /> */}
                                                                <img className="w-12 h-12 object-contain" src="assets/shop/moonlightsickle.png" />
                                                                <span className="w-40 text-center">{item.name}</span>
                                                                <span className="w-20 text-center">${item.income}</span>
                                                                <span className="w-20 text-center">${item.upkeep}</span>
                                                                <span className="w-20 text-center">${item.cost}</span>
                                                                <span
                                                                    className="w-28 h-10 bg-custom-button-primary text-center text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                                                                    onClick={() => handleEntityButton(item.name, item.cost)}
                                                                >
                                                                    PURCHASE
                                                                </span>
                                                            </div>
                                                            <hr className="border-custom-color-grey w-full mt-1 mb-2" />
                                                        </Fragment>
                                                    )
                                                })
                                                : null
                                        }
                                    </div>
                                </CardLight>
                            )
                            : null      // ADD ITEM SHOP
                    }
                </div>
            </Layout>
        </Fragment>
    )
}

export default Shop