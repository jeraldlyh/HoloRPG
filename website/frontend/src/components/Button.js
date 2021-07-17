import React from "react"

function Button(props) {
    return (
        <div
            className={`flex w-${props.width} h-${props.height} bg-custom-button-primary text-white text-sm uppercase font-bold py-2 px-4 rounded-lg justify-center items-center`}
        >
            {props.text}
        </div>

    )
}

export default Button