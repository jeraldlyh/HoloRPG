import React, { useState } from "react"
import Layout from "../components/layout"
import CardLight from "../components/cardLight"
import { useShop } from "../hooks/useShop"
import Modal from "../components/modal"
import _ from "lodash"
import { useProfile } from "../hooks/useProfile"
import { useEntity } from "../hooks/useEntity"
import { useRelationship } from "../hooks/useRelationship"

function Shop({ session }) {
    const { accessToken, user: { username } } = session
    const { data: relationshipData, loading: relationshipLoading } = useRelationship(username, accessToken)
    const { data: profileData, loading: profileLoading, mutate: profileMutate } = useProfile(username, accessToken)
    const { data: entityData, loading: entityLoading, mutate: entityMutate } = useEntity(username, accessToken)
    const { data: shopData } = useShop(accessToken)

    const [showModal, setShowModal] = useState(false)
    const [purchaseData, setPurchaseData] = useState({
        itemName: "",
        itemImage: "",
        itemCost: 0,
        owned: ""
    })

    const handleButton = (item) => {
        setPurchaseData({
            itemName: item.name,
            itemImage: "",
            itemCost: item.cost,
        })
        setShowModal(true)
    }

    return (
        <Layout
            profileData={profileData} profileMutate={profileMutate}
            relationshipData={relationshipData}
        >
            {/* tabs */}
            <div className="relative flex flex-col w-full h-full overflow-y-auto scrollbar-hide">
                {showModal
                    ? <Modal
                        header="Purchase"
                        itemData={purchaseData}
                        toggleModal={() => setShowModal(false)}
                        profileData={profileData}
                        profileMutate={profileMutate}
                        entityData={entityData}
                        entityMutate={entityMutate}
                    />
                    : null}

                <p className="text-white font-semibold m-5 space-x-12">
                    <span className="">Items</span>
                    <span className="text-custom-misc-inactive">Entities</span>
                </p>

                {/* shop */}
                <CardLight height="full" width="full">
                    <div className="flex w-full items-center justify-around mb-3">
                        <span className="w-12 text-center font-semibold">ITEM</span>
                        <span className="w-40 text-center font-semibold">NAME</span>
                        <span className="w-20 text-center font-semibold">INCOME</span>
                        <span className="w-20 text-center font-semibold">UPKEEP</span>
                        <span className="w-20 text-center font-semibold">COST</span>
                        <span className="w-28 text-center font-semibold" />
                    </div>

                    <hr className="border-custom-color-grey w-full mt-1 mb-2"></hr>

                    <div className="flex flex-col w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                        {
                            shopData
                                ? shopData.map((item, index) => {
                                    return (
                                        <div key={index} className="flex w-full justify-around items-center text-sm my-2">
                                            <div className="w-12 h-12 bg-custom-color-lightgrey" />
                                            <p className="w-40 text-center">{item.name}</p>
                                            <p className="w-20 text-center">${item.income}</p>
                                            <p className="w-20 text-center">${item.upkeep}</p>
                                            <p className="w-20 text-center">${item.cost}</p>
                                            <div
                                                className="w-28 h-10 bg-custom-button-primary text-center text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                                                onClick={() => handleButton(item)}
                                            >
                                                PURCHASE
                                            </div>
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                </CardLight>
            </div>
        </Layout>
    )
}

export default Shop