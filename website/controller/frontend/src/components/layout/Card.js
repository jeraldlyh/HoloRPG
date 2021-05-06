import React from "react"


export default function Card(props) {
    return (
        <div className="max-w py-4 px-8 my-20 bg-gray-900 shadow-lg rounded-lg">
            <div>
                <h2 className="font-bold">{props.title}</h2>
                <p className="mt-2">{props.content}</p>
            </div>
        </div>
    )
}