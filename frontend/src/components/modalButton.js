import React from "react"
import { isContainFraction, convertFractionToPercentage } from "../utils/utils"


function ModalButton({ width, height, background, text, onClick, disabled }) {
    const hasFraction = () => {
        return isContainFraction(width) || isContainFraction(height)
    }

    const getStyles = () => {
        if (isContainFraction(width) && isContainFraction(height)) {
            return {
                width: convertFractionToPercentage(width),
                height: convertFractionToPercentage(height)
            }
        } else if (isContainFraction(height)) {
            return {
                height: convertFractionToPercentage(height)
            }
        } else if (isContainFraction(width)) {
            return {
                width: convertFractionToPercentage(width)
            }
        }
    }

    return (
        <button
            className={
                `flex w-${width} h-${height} 
                ${background ? "bg-custom-misc-accent" : "border border-custom-misc-accent"} 
                shadow-button rounded-lg 
                text-white text-sm 
                uppercase font-semibold py-2 px-4 
                justify-center items-center 
                disabled:cursor-not-allowed 
                disabled:opacity-50 
                hover:bg-opacity-90`
            }
            onClick={onClick}
            disabled={disabled}
            style={hasFraction() ? getStyles() : null}
        >
            {text}
        </button>
    )
}

export default ModalButton