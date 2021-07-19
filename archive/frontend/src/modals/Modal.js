import React from "react"

const Modal = ({ handleToggle, show, children }) => {
    const showModal = show ? "absolute flex justify-center opacity-90 w-full h-full bg-gray-900 z-10" : "hidden"

    return (
        <div className={showModal}>
            <div className="flex flex-col w-full items-center content-center">
                {children}
                <button className="uppercase" type="button" onClick={handleToggle}>Close</button>
            </div>
        </div>
    )
}

export default Modal