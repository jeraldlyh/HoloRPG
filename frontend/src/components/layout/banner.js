import React, { Fragment } from "react"
import { FaInbox } from "react-icons/fa"
import { AiOutlineQuestionCircle } from "react-icons/ai"


function Banner(props) {
    return (
        <div className="flex flex-col justify-between w-full h-44 p-6 bg-custom-card-normal">
            <div className="flex justify-between items-center">
                <span className="text-white text-md">HOLO</span>
                <div className="flex space-x-3 text-white">
                    <AiOutlineQuestionCircle size={20} />
                    <FaInbox size={20} />
                </div>
            </div>
            {
                props.title
                    ? <Fragment>{props.title}</Fragment>
                    : null
            }
        </div>
    )
}

export default Banner