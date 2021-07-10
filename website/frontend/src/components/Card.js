import React from "react"

function Card(props) {
    console.log(props)
    return (
        <div className={`rounded-lg h-${props.height} w-${props.width} p-4 bg-custom-misc-card text-white`}>
            <div className="flex items-center border-b-2 border-custom-misc-accent w-auto pb-2">
                {props.icon}
                <p className="ml-3 font-bold">{props.title}</p>
            </div>
            <div className="mt-3">
                {props.children}
            </div>
        </div>
    )
}

export default Card