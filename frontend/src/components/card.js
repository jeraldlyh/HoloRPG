import React, { Fragment } from "react"

function Card({ height, width, icon, title, children }) {
    const isWidthContainFraction = () => {
        return width.includes("/")
    }

    const isHeightContainFraction = () => {
        return height.includes("/")
    }

    const parseFraction = (text) => {
        const textSplit = text.split("/")
        const length = Math.ceil((parseInt(textSplit[0]) / parseInt(textSplit[1]) * 100))
        return length + "%"
    }

    const hasFraction = () => {
        return isWidthContainFraction() || isHeightContainFraction()
    }

    const getStyles = () => {
        if (isWidthContainFraction() && isHeightContainFraction()) {
            return {
                width: parseFraction(width),
                height: parseFraction(height)
            }
        } else if (isHeightContainFraction()) {
            return {
                height: parseFraction(height)
            }
        } else if (isWidthContainFraction) {
            return {
                width: parseFraction(width)
            }
        }
    }

    return (
        <div
            className={`rounded-lg h-${height} w-${width} p-4 bg-custom-card-normal text-white`}
            style={hasFraction() ? getStyles() : {}}
        >
            {
                title
                    ? <Fragment>
                        <div className="flex flex-col items-center max-w-max">
                            <div className="flex justify-around items-center">
                                &nbsp;{icon}
                                <p className="ml-3 font-semibold">{title}&nbsp;</p>
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