import React from "react"

function Button({ width, height, background, round, text, onClick, disabled }) {
    return (
        <button
            className={
                `flex w-${width} h-${height} 
                ${background ? "bg-custom-button-primary" : "border border-custom-button-primary"} ${round ? "rounded-full" : "rounded-lg"}
                shadow-button
                text-white text-sm 
                uppercase font-semibold py-2 px-4 
                justify-center items-center 
                disabled:cursor-not-allowed 
                disabled:opacity-50 
                hover:bg-opacity-90`
            }
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button