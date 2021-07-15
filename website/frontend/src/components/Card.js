import React from "react"

function Card(props) {
    return (
        <div className={`rounded-lg h-${props.height} w-${props.width} p-4 bg-custom-card-normal text-white`}>
            <div className="flex flex-col items-center max-w-max">
                <div className="flex justify-around items-center">
                    &nbsp;{props.icon}
                    <p className="ml-3 font-bold">{props.title}&nbsp;</p>
                </div>
                <hr className="border border-custom-misc-accent w-full mt-1" />
            </div>
            <div className="mt-3">
                {props.children}
            </div>
        </div>
    )
}

export default Card