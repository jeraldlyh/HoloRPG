import React from "react"

function Button({ width, height, background, text, onClick, disabled }) {
    return (
        <button
            className={`flex w-${width} h-${height} ${background ? "bg-custom-button-primary" : "border border-custom-button-primary"} shadow-button text-white text-sm uppercase font-semibold py-2 px-4 rounded-lg justify-center items-center disabled:cursor-not-allowed hover:bg-opacity-90 disabled:opacity-50`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button