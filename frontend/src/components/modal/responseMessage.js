import React from "react"
import ErrorMessage from "./errorMessage"
import SuccessMessage from "./successMessage"
import ModalButton from "./modalButton"


function ResponseMessage({ errorMessage, successMessage, toggleModal }) {
    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            {
                errorMessage
                    ? <ErrorMessage message={errorMessage} />
                    : <SuccessMessage message={successMessage} />
            }
            <ModalButton background={true} text="Confirm" onClick={toggleModal} width="1/3" height="auto" />
        </div>
    )
}

export default ResponseMessage