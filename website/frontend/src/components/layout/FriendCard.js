import React from "react"

function FriendCard(props) {
    return (
        <div className="flex flex-row w-full mb-1.5 px-1 items-center">
            <div className="flex w-1/5">
                <img src={props.image} alt={props.name} />
            </div>
            <div className="flex flex-col w-4/5 p-2">
                <span className="font-bold">{props.name}</span>
                <div><span className="mt-1 font-bold">Level: </span>{props.level}</div>
                <div><span className="font-bold">Status: </span>{props.status}</div>
            </div>
        </div>
    )
}

export default FriendCard