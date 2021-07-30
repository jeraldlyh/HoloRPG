import React from "react"
import { MdErrorOutline } from "react-icons/md"


function ErrorMessage({ message }) {
    return (
        <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center justify-center w-16 h-16 p-3 bg-custom-misc-status rounded-full">
                <MdErrorOutline className="w-full h-full" />
            </div>
            <span className="text-custom-misc-status">
                {message}
            </span>
        </div>
    )
}

export default ErrorMessage