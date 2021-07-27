import React, { useState, useEffect } from "react"
import NumberFormat from "react-number-format"
import { BiPurchaseTagAlt } from "react-icons/bi"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import axiosInstance from "../axios/axiosInstance"
import { useAuth } from "../hooks/useAuth"
import Button from "./button"
import { clampQuantity } from "../utils/utils"
import _ from "lodash"


function Modal({ header, itemData, toggleModal, entities, entityMutate, profileData, profileMutate }) {
    const { itemName, itemImage, itemCost } = itemData
    const { session } = useAuth()
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [cost, setCost] = useState(0)

    useEffect(() => {                                   // Whenever cost changes, check if is valid
        if (isDisabled()) {
            setShowError(true)
        } else {
            setShowError(false)
        }
    }, [cost])

    useEffect(() => {                                   // Update total cost upon changes in quantity
        const limit = clampQuantity(quantity)

        if (limit > 0) {
            if (showSuccess) {                          // Clear success message after user purchase
                setShowSuccess(false)
            }
            setQuantity(limit)
            setCost(itemCost * limit)
        } else {
            resetQuantityCost()
        }
    }, [quantity])

    const getEntityOwned = () => {
        const entity = _.find(entities, { entity: itemName })
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

    const handleEntityMutation = () => {
        const updatedData = _.map(entities, item => {
            if (item.entity === itemName) {
                item.quantity += quantity
            }
            return item
        })
        return updatedData
    }

    const handleProfileMutation = () => {
        profileData.currency -= cost
        return profileData
    }

    const handleSubmit = async () => {
        axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = "Bearer " + session.accessToken
            return config
        })
        const body = {
            user: session.user.pk,
            quantity: quantity,
            entity: itemName,
        }
        entityMutate(() => handleEntityMutation(), false)
        profileMutate(() => handleProfileMutation(), false)
        setShowSuccess(true)
        setQuantity(0)
        await axiosInstance.post("/api/entity/purchase/", body)
        entityMutate()
        profileMutate()
    }

    const isDisabled = () => {
        return !(profileData.currency >= cost && profileData.currency !== 0)
    }

    return (
        <div className={`absolute flex items-center justify-center w-full h-full text-white bg-black/75`}>
            <div className="flex flex-col w-2/3 h-full p-36">
                {/* Header */}
                <div className="flex items-center justify-between w-full h-14 bg-custom-modal-header px-8">
                    <div className="flex items-center space-x-1.5">
                        <BiPurchaseTagAlt />
                        <p className="uppercase font-semibold">{header}</p>
                    </div>
                    <div
                        className="font-bold text-custom-color-lightgrey cursor-pointer hover:text-custom-misc-status"
                        onClick={() => toggleModal()}
                    >
                        X
                    </div>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-y-2 items-center h-2/3 bg-custom-modal-body px-8 py-4">
                    <div className="flex flex-col items-center">
                        <p>{itemName}</p>
                        <div className="w-14 h-14 bg-custom-color-grey" />
                    </div>
                    <p>You currently own: {getEntityOwned()}</p>
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
                    <p className="flex flex-col items-center">
                        <span>Total cost: <NumberFormat value={cost} displayType={"text"} thousandSeparator={true} prefix={"$"} /></span>
                        {
                            showError
                                ? <span className="text-xs text-custom-stats-health">You do not have sufficient currency</span>
                                : null
                        }
                        {
                            showSuccess
                                ? <span className="text-xs text-custom-stats-defence">{`You have successfully purchased ${quantity} ${itemName}!`}</span>
                                : null
                        }
                    </p>
                    <Button width="auto" height="8" background={true} text="confirm" onClick={() => handleSubmit()} disabled={isDisabled()} />
                </div>
            </div>
        </div>
    )
}

export default Modal