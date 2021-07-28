import React, { useState, Fragment } from "react"
import CardLight from "../cardLight"
import PurchaseModal from "./purchaseModal"

function EntityShop({ shopData, profileData, profileMutate, entityData, entityMutate, accessToken }) {
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
        <Fragment>
            {
                showModal
                    ? <PurchaseModal
                        itemData={purchaseData}
                        toggleModal={() => setShowModal(false)}
                        profileData={profileData}
                        profileMutate={profileMutate}
                        entityData={entityData}
                        entityMutate={entityMutate}
                        accessToken={accessToken}
                    />
                    : null
            }
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
                                        <hr className="border-custom-color-grey w-full mt-1 mb-2" />
                                    </Fragment>
                                )
                            })
                            : null
                    }
                </div>
            </CardLight>
        </Fragment>
    )
}

export default EntityShop