import React from "react"
import { convertFractionToPercentage, isContainFraction } from "../utils/utils"


function CardLight({ width, height, title, header, icon, children, setRef }) {
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
        <div
            ref={setRef}
            className={`rounded-lg h-${height} w-${width} p-4 bg-custom-card-light border border-custom-color-grey text-white`}
            style={hasFraction() ? getStyles() : {}}
        >
            {
                header
                    ? <div className="flex flex-col items-center max-w-max">
                        <div className="flex justify-around items-center">
                            &nbsp;{icon}
                            <span className="ml-3 font-bold">{title}&nbsp;</span>
                        </div>
                        <hr className="border-t-2 border-custom-misc-accent w-full h-px mt-1" />
                    </div>
                    : null
            }
            <div className={`flex flex-col h-full ${header ? "mt-3 -ml-4 -mr-4" : ""}`}>
                {children}
            </div>
        </div>
    )
}

export default CardLight