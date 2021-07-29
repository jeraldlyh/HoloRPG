import React, { useState } from "react"
import Modal from "../modal"
import { GiBullseye } from "react-icons/gi"
import NumberFormat from "react-number-format"


function BountyModal({ toggleModal, userData }) {
    const { username, net_worth } = userData

    return (
        <Modal header="Bounty Confirmation" icon={<GiBullseye />} toggleModal={toggleModal} height="1/3" >
            <p className="flex flex-col items-center">
                <span className="font-semibold text-xl">Are you sure?</span>
                <p className="flex items-center">
                    <span className="text-sm">You are placing&nbsp;</span>
                    <span className="font-semibold">{username}</span>
                    <span className="text-sm">&nbsp;for&nbsp;</span>
                    <span className="font-semibold">
                        <NumberFormat value={net_worth} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                    </span>
                </p>
            </p>
        </Modal>
    )
}

export default BountyModal