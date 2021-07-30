import React, { Fragment, useState } from "react"
import _ from "lodash"
import axiosInstance from "../../axios"
import { GiBullseye } from "react-icons/gi"
import NumberFormat from "react-number-format"
import { TiTickOutline } from "react-icons/ti"
import Modal from "../modal"
import ModalButton from "../modal/modalButton"
import Loading from "../modal/loading"
import ResponseMessage from "../modal/responseMessage"


function BountyModal({ toggleModal, userData, username, accessToken, profileMutate, bountyMutate, playerData }) {
    const [isLoading, setIsLoading] = useState(false)
    const [showResponseMessage, setShowResponseMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { target, net_worth } = userData

    const placeBounty = async () => {
        try {
            setIsLoading(true)
            axiosInstance.interceptors.request.use(function (config) {
                config.headers.Authorization = "Bearer " + accessToken
                return config
            })
            const body = {
                placed_by: username,
                target: target,
                value: net_worth
            }
            await axiosInstance.post("/api/bounty/", body)

            await profileMutate()               // Calls endpoint to refresh client side cache for player data
            await bountyMutate(() => {          // Remove bounty player from client cache and wait for next call to endpoint to refresh data
                const updatedData = _.filter(playerData, function (player) {
                    return player.username !== username
                })
                return updatedData
            }, false)

            setShowResponseMessage(true)
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setShowResponseMessage(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal header="Bounty Confirmation" icon={<GiBullseye />} toggleModal={toggleModal} height="auto" isLoading={isLoading} >
            {
                isLoading
                    ? <Loading />
                    : (
                        <div className="flex flex-col h-full justify-center items-center">
                            {
                                showResponseMessage           // Shows response message after placing bounty
                                    ? <ResponseMessage
                                        errorMessage={errorMessage}
                                        successMessage={
                                            <span>
                                                {`You have successfully placed ${target} on the bounty list for `}
                                                <NumberFormat value={net_worth} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                                !
                                            </span>
                                        }
                                        toggleModal={toggleModal}
                                    />
                                    : (
                                        <Fragment>
                                            <div className="flex items-center justify-center w-12 h-12 p-3 bg-custom-misc-accent rounded-full">
                                                <TiTickOutline className="w-full h-full" />
                                            </div>
                                            <span className="font-semibold text-lg my-1">Are you sure?</span>
                                            <span className="text-sm mb-4">
                                                You are placing {target} for&nbsp;
                                                <NumberFormat value={net_worth} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                            </span>
                                            <div className="flex items-center space-x-4">
                                                <ModalButton text="Cancel" onClick={toggleModal} width="auto" height="auto" />
                                                <ModalButton background={true} text="Confirm" onClick={() => placeBounty()} width="auto" height="auto" />
                                            </div>
                                        </Fragment>
                                    )
                            }
                        </div>
                    )
            }

        </Modal>
    )
}

export default BountyModal