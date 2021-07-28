import React from "react"
import { convertFractionToPercentage, isContainFraction } from "../utils/utils"


function Modal({ header, icon, children, height, toggleModal }) {
    const getStyles = () => {
        if (isContainFraction(height)) {
            return {
                height: convertFractionToPercentage(height)
            }
        }
    }

    return (
        <div className={`absolute flex items-center justify-center w-full h-full text-white bg-black/75`}>
            <div className="flex flex-col w-2/3 h-full p-36">
                {/* Header */}
                <div className="flex rounded-t-lg items-center justify-between w-full h-12 bg-custom-modal-header px-8">
                    <div className="flex items-center space-x-1.5">
                        {icon}
                        <p className="uppercase font-semibold text-sm">{header}</p>
                    </div>
                    <div
                        className="font-bold text-custom-color-lightgrey cursor-pointer hover:text-custom-misc-status"
                        onClick={toggleModal}
                    >
                        X
                    </div>
                </div>

                {/* Body */}
                <div
                    className={`flex flex-col rounded-b-lg gap-y-2 h-${height} items-center bg-custom-modal-body px-8 py-4`}
                    style={isContainFraction(height) ? getStyles() : null}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal