import React from "react"


function CardLight({ width, height, title, header, icon, children}) {
    const isWidthContainFraction = () => {
        return width.includes("/")
    }

    const isHeightContainFraction = () => {
        return height.includes("/")
    }

    const parseFraction = (text) => {
        const textSplit = text.split("/")
        const length = Math.ceil((parseInt(textSplit[0]) / parseInt(textSplit[1]) * 100))
        return  length + "%"
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
            className={`rounded-lg h-${height} w-${width} p-4 bg-custom-card-light border border-custom-color-grey text-white`}
            style={hasFraction() ? getStyles() : {}}
        >
            {
                header
                    ? <div className="flex flex-col items-center max-w-max">
                        <div className="flex justify-around items-center">
                            &nbsp;{icon}
                            <p className="ml-3 font-bold">{title}&nbsp;</p>
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