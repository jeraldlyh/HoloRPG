import React from "react"
import RingLoader from "react-spinners/RingLoader"


function Loading() {
    return (
        <div className="flex h-full items-center justify-center">
            <RingLoader color="#8955DF" size={140} />
        </div>
    )
}

export default Loading