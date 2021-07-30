import React, { Fragment } from "react"
import ErrorMessage from "./errorMessage"
import SuccessMessage from "./successMessage"
import ModalButton from "./modalButton"


function ResponseMessage({ errorMessage, successMessage, toggleModal }) {
    return (
        <Fragment>
            {
                errorMessage
                    ? <ErrorMessage message={errorMessage} />
                    : <SuccessMessage message={successMessage} />
            }
            <ModalButton background={true} text="Confirm" onClick={toggleModal} width="1/3" height="auto" />
        </Fragment>
    )
}

export default ResponseMessage