import React from "react"
import "./Card.css"

function Card(props) {
    return (
        <div className="gradient-border box" id="box">
            <div className="flex flex-col p-5">
                <p className="font-bold">
                    {props.name}
                </p>
                <p className="">
                    {props.description}
                </p>
            </div>
        </div>
    )
}

export default Card