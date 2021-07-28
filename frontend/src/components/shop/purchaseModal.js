import React, { useState, useEffect } from "react"
import NumberFormat from "react-number-format"
import { BiPurchaseTagAlt } from "react-icons/bi"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import axiosInstance from "../../axios/axiosInstance"
import Button from "../button"
import { clampQuantity } from "../../utils/utils"
import _ from "lodash"
import Modal from "../modal"

function PurchaseModal({ itemData, toggleModal, entityData, entityMutate, profileData, profileMutate, accessToken, playerId }) {
    const { itemName, itemImage, itemCost } = itemData
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

        if (showSuccess) {                          // Clear success message after user purchase
            setShowSuccess(false)
        }
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

    const handleEntityMutation = () => {
        const updatedData = _.map(entityData, item => {
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
        entityMutate(() => handleEntityMutation(), false)
        profileMutate(() => handleProfileMutation(), false)
        setShowSuccess(true)

        axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = "Bearer " + accessToken
            return config
        })
        const body = {
            user: playerId,
            quantity: quantity,
            entity: itemName,
        }
        const response = await axiosInstance.post("/api/entity/purchase/", body)

        entityMutate(response.data, false)
        profileMutate()
    }

    const isDisabled = () => {
        return !(profileData.currency >= cost && profileData.currency !== 0)
    }

    return (
        <Modal icon={<BiPurchaseTagAlt />} header="Purchase" height="4/5" toggleModal={toggleModal}>
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
            <Button width="auto" height="8" background={true} text="confirm" onClick={() => handleSubmit()} disabled={isDisabled() || quantity === 0} />
        </Modal >
    )
}

export default PurchaseModal