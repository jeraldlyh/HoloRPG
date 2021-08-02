import React from "react"
import { convertFractionToPercentage, isContainFraction } from "../utils"

function Button({ width, height, background, round, text, onClick, disabled }) {
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
                ${background ? "bg-custom-button-primary" : "border border-custom-button-primary"} 
                ${round ? "rounded-full" : "rounded-lg"}
                shadow-button
                text-white text-sm 
                uppercase font-semibold py-2 px-4 
                justify-center items-center 
                disabled:cursor-not-allowed 
                disabled:opacity-50 
                hover:bg-opacity-90`
            }
            style={hasFraction() ? getStyles() : {}}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button