import React from "react"

function CardLight(props) {
    return (
        <div className={`rounded-lg h-${props.height} w-${props.width} p-4 bg-custom-card-light border border-custom-color-grey text-white`}>
            {
                props.header
                    ? <div className="flex flex-col items-center max-w-max">
                        <div className="flex justify-around items-center">
                            &nbsp;{props.icon}
                            <p className="ml-3 font-bold">{props.title}&nbsp;</p>
                        </div>
                        <hr className="border border-custom-misc-accent w-full mt-1" />
                    </div>
                    : null
            }
            <div className={`flex flex-col ${props.header ? "mt-3 " : ""}-ml-4 -mr-4`}>
                {props.children}
            </div>
        </div>
    )
}

export default CardLight