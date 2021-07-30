import React, { Fragment } from "react"
import { convertFractionToPercentage, isContainFraction } from "../utils/utils"


function Card({ height, width, icon, title, children, setRef }) {
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
            className={`rounded-lg h-${height} w-${width} p-4 bg-custom-card-normal text-white`}
            style={hasFraction() ? getStyles() : {}}
        >
            {
                title
                    ? <Fragment>
                        <div className="flex flex-col items-center max-w-max">
                            <div className="flex justify-around items-center">
                                &nbsp;{icon}
                                <span className="ml-3 font-semibold">{title}&nbsp;</span>
                            </div>
                            <hr className="border-t-2 border-custom-misc-accent w-full h-px mt-1" />
                        </div>
                        <div className="mt-3">
                            {children}
                        </div>
                    </Fragment>
                    : <Fragment>
                        {children}
                    </Fragment>
            }
        </div>
    )
}

export default Card