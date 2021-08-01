import React, { useState, useEffect, Fragment } from "react"
import NumberFormat from "react-number-format"
import { BiPurchaseTagAlt } from "react-icons/bi"
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi"
import axiosInstance from "../../axios"
import ModalButton from "../modal/modalButton"
import { clampQuantity } from "../../utils"
import _ from "lodash"
import Modal from "../modal"
import Loading from "../modal/loading"
import ResponseMessage from "../modal/responseMessage"
import { RiHeartPulseFill } from "react-icons/ri"
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi"


function PurchaseModal({ itemData, toggleModal, entityData, entityMutate, profileData, profileMutate, accessToken }) {
    const { itemName, itemImage, itemCost } = itemData

    const [isLoading, setIsLoading] = useState(false)
    const [showResponseMessage, setShowResponseMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isInsufficientCurrency, setIsInsufficientCurrency] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [cost, setCost] = useState(0)

    useEffect(() => {                                   // Whenever cost changes, check if is valid
        if (isDisabled()) {
            setIsInsufficientCurrency(true)
        } else {
            setIsInsufficientCurrency(false)
        }
    }, [cost])

    useEffect(() => {                                   // Update total cost upon changes in quantity
        const limit = clampQuantity(quantity)
        if (limit > 0) {
            setQuantity(limit)
            setCost(itemCost * limit)
        } else {
            resetQuantityCost()
        }
    }, [quantity])

    const getEntityOwned = () => {
        const entity = _.find(entityData, { entity: itemName })
        return entity ? entity.quantity : 0
    }

    const resetQuantityCost = () => {
        setQuantity(0)
        setCost(0)
    }

    const onManualEdit = (e) => {
        const value = e.target.value

        if (value) {
            setQuantity(parseInt(value))
        } else {
            resetQuantityCost()
        }
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            axiosInstance.interceptors.request.use(function (config) {
                config.headers.Authorization = "Bearer " + accessToken
                return config
            })
            const body = {
                user: profileData.username,
                quantity: quantity,
                entity: itemName,
            }
            const response = await axiosInstance.post("/api/entity/purchase/", body)

            await entityMutate(response.data, false)          // Update client side cache with server response instead of refreshing the call
            await profileMutate()                             // Calls endpoint to refresh client side cache for player data

            setShowResponseMessage(true)
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setShowResponseMessage(true)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }

    const isDisabled = () => {
        return !(profileData.currency >= cost && profileData.currency !== 0)
    }

    return (
        <Modal icon={<BiPurchaseTagAlt />} header="Purchase" width="auto" height="auto" toggleModal={toggleModal} isLoading={isLoading}>
            {
                isLoading       // Shows loading spinner if loading
                    ? <Loading />
                    : (
                        <div className="flex flex-col w-full h-full justify-center items-center space-y-6">
                            {
                                showResponseMessage     // Returns response message after interacting with endpoint
                                    ? <ResponseMessage
                                        errorMessage={errorMessage}
                                        successMessage={`You have successfully purchased ${quantity} ${itemName}!`}
                                        toggleModal={toggleModal}
                                    />
                                    : (                 // Shows purchase modal
                                        <Fragment>
                                            <div className="flex w-full h-full justify-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-14 h-14 bg-custom-color-grey mb-3" />

                                                    <span>{itemName}</span>
                                                </div>

                                                <div className="flex flex-col ml-10">
                                                    <p className="text-sm font-light">A short description of item.</p>

                                                    <div className="flex items-center space-x-6 text-sm mt-4">
                                                        <div className="flex gap-x-1 items-center justify-center">
                                                            <span className="mr-1">62</span>
                                                            <RiHeartPulseFill size={22} />
                                                        </div>
                                                        <div className="flex gap-x-1 items-center justify-center">
                                                            <span className="mr-1">30</span>
                                                            <GiPiercingSword size={22} />
                                                        </div>
                                                        <div className="flex gap-x-1 items-center justify-center">
                                                            <span className="mr-1">120</span>
                                                            <GiCheckedShield size={22} />
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold mt-6">Inventory: {getEntityOwned()}</span>
                                                    {
                                                        isInsufficientCurrency
                                                            ? <span className="text-xs font-light text-custom-stats-health mt-2">You do not have sufficient currency.</span>
                                                            : null
                                                    }
                                                </div>

                                                <div className="flex flex-col items-center ml-24">
                                                    <div className="flex justify-center h-12 p-4 bg-custom-card-normal rounded-lg items-center space-x-3">
                                                        <div className="text-gray-400 hover:text-custom-misc-status cursor-pointer" onClick={() => setQuantity(quantity - 1)}><FiMinusSquare size={26} /></div>
                                                        <input
                                                            className="w-16 bg-transparent text-center text-lg"
                                                            value={quantity}
                                                            placeholder={quantity}
                                                            onChange={e => onManualEdit(e)}
                                                        />
                                                        <div className="text-gray-400 hover:text-custom-misc-online cursor-pointer" onClick={() => setQuantity(quantity + 1)}><FiPlusSquare size={26} /></div>
                                                    </div>
                                                    <span className="font-semibold mt-6 mb-4">Total cost: <NumberFormat value={cost} displayType={"text"} thousandSeparator={true} prefix={"$"} /></span>

                                                    <ModalButton width="full" height="10" background={true} text="confirm" onClick={() => handleSubmit()} disabled={isDisabled() || quantity === 0} />
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                            }
                        </div>
                    )
            }
        </Modal >
    )
}

export default PurchaseModal