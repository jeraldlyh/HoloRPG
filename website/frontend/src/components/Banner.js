import React from "react"
import { FaInbox } from "react-icons/fa"
import { AiOutlineQuestionCircle } from "react-icons/ai"

function Banner() {
    return (
        <div className="w-full h-36 p-8 border-2 border-white">
            <div className="flex justify-between items-center">
                <p className="text-white text-md">HOLO</p>
                <div className="flex flex-row space-x-3 text-white">
                    <AiOutlineQuestionCircle size={20} />
                    <FaInbox size={20} />
                </div>
            </div>
        </div>
    )
}

export default Banner