import React from "react"

function FriendCard(props) {
    return (
        <div className="flex flex-row w-full h-16">
            <div className="border-2 w-24 flex items-center justify-center">
                {props.picture}
            </div>
            <div className="flex flex-col w-full p-2 space-y-px">
                <p className="font-bold">{props.name}</p>
                <p className="mt-2">{props.level}</p>
            </div>

        </div>
    )
}

export default FriendCard