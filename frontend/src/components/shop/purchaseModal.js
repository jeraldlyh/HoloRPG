import React, { useState, useEffect, Fragment } from "react"
import NumberFormat from "react-number-format"
import { BiPurchaseTagAlt } from "react-icons/bi"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import axiosInstance from "../../axios"
import Button from "../button"
import { clampQuantity } from "../../utils"
import _ from "lodash"
import Modal from "../modal"
import Loading from "../modal/loading"
import ResponseMessage from "../modal/responseMessage"


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
            setIsLoading(false)
        }
    }

    const isDisabled = () => {
        return !(profileData.currency >= cost && profileData.currency !== 0)
    }

    return (
        <Modal icon={<BiPurchaseTagAlt />} header="Purchase" height="4/5" toggleModal={toggleModal} isLoading={isLoading}>
            {
                isLoading       // Shows loading spinner if loading
                    ? <Loading />
                    : (
                        <div className="flex flex-col h-full justify-center items-center">
                            {
                                showResponseMessage     // Returns response message after interacting with endpoint
                                    ? <ResponseMessage
                                        errorMessage={errorMessage}
                                        successMessage={`You have successfully purchased ${quantity} ${itemName}!`}
                                        toggleModal={toggleModal}
                                    />
                                    : (                 // Shows purchase modal
                                        <Fragment>
                                            <div className="flex flex-col items-center">
                                                <span>{itemName}</span>
                                                <div className="w-14 h-14 bg-custom-color-grey" />
                                            </div>
                                            <span>You currently own: {getEntityOwned()}</span>
                                            <div className="flex items-center space-x-1">
                                                <div className="hover:text-custom-misc-status" onClick={() => setQuantity(quantity - 1)}><FiMinusCircle size={28} /></div>
                                                <input
                                                    className="w-14 bg-custom-color-grey text-center"
                                                    value={quantity}
                                                    placeholder={quantity}
                                                    onChange={e => onManualEdit(e)}
                                                />
                                                <div className="hover:text-custom-misc-online" onClick={() => setQuantity(quantity + 1)}><FiPlusCircle size={28} /></div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span>Total cost: <NumberFormat value={cost} displayType={"text"} thousandSeparator={true} prefix={"$"} /></span>
                                                {
                                                    isInsufficientCurrency
                                                        ? <span className="text-xs text-custom-stats-health">You do not have sufficient currency</span>
                                                        : null
                                                }
                                            </div>
                                            <Button width="auto" height="8" background={true} text="confirm" onClick={() => handleSubmit()} disabled={isDisabled() || quantity === 0} />
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