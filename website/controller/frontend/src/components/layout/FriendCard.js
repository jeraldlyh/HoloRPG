import React from "react"
import logo from "../../assets/power-button.jpeg"

function FriendCard(props) {
    return (
        <div className="flex flex-row w-full h-16 mb-3 px-2">
            <div className="w-24 flex items-center justify-center">
                <img src={logo} alt={props.name} />
            </div>
            <div className="flex flex-col w-full p-2 space-y-px">
                <p className="font-bold">{props.name}</p>
                <p className="mt-2">{props.status}</p>
                <p className="mt-2">{props.level}</p>
            </div>
        </div>
    )
}

export default FriendCard