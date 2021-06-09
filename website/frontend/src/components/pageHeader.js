import React from "react"

function PageHeader(props) {
    return (
        <span className="text-2xl text-left font-bold uppercase mb-3">{props.header}</span>
    )
}

export default PageHeader