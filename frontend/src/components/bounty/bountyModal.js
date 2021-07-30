import React, { Fragment, useState } from "react"
import RingLoader from "react-spinners/RingLoader"
import Modal from "../modal"
import { GiBullseye } from "react-icons/gi"
import NumberFormat from "react-number-format"
import { TiTickOutline } from "react-icons/ti"
import { MdErrorOutline } from "react-icons/md"
import ModalButton from "../modalButton"
import axiosInstance from "../../axios/axiosInstance"


function BountyModal({ toggleModal, userData, username, accessToken, profileMutate }) {
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
            await profileMutate()
            showResponseMessage(true)
            setIsLoading(false)
        } catch (error) {
            setShowResponseMessage(true)
            setErrorMessage(error.response.data.message)
            setIsLoading(false)
        }
    }

    return (
        <Modal header="Bounty Confirmation" icon={<GiBullseye />} toggleModal={toggleModal} height="auto" isLoading={isLoading} >
            {
                isLoading
                    ? (
                        <div className="flex h-full items-center justify-center">
                            <RingLoader color="#8955DF" size={140} />
                        </div>
                    )
                    : (
                        <div className="flex flex-col h-full justify-center items-center">
                            {
                                showResponseMessage           // Shows response message after placing bounty
                                    ? (
                                        <div className="flex flex-col h-full justify-center items-center space-y-3">
                                            {
                                                errorMessage
                                                    ?
                                                    <div className="flex flex-col items-center space-y-3">
                                                        <div className="flex items-center justify-center w-16 h-16 p-3 bg-custom-misc-status rounded-full">
                                                            <MdErrorOutline className="w-full h-full" />
                                                        </div>
                                                        <span className="text-custom-misc-status">
                                                            {errorMessage}
                                                        </span>
                                                    </div>
                                                    : <span className="text-custom-stats-defence">
                                                        {`You have successfully placed ${target} on the bounty list for `}
                                                        <NumberFormat value={net_worth} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                                        !
                                                    </span>
                                            }

                                            <ModalButton background={true} text="Confirm" onClick={toggleModal} width="1/3" height="auto" />
                                        </div>
                                    )
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