import React, { useState, useEffect } from "react"
import FriendCard from "./FriendCard"

function FriendBar(props) {
    const [status, setStatus] = useState(true)

    const onClick = () => {
        setStatus(!status)
    }


    const online = (
        <button className="rounded-full font-bold focus:outline-none w-20 py-1 text-center bg-custom-green" onClick={onClick}>Online</button>
    )

    const away = (
        <button className="rounded-full font-bold focus:outline-none w-20 py-1 text-center bg-custom-orange" onClick={onClick}>Away</button>
    )


    return (
        <div className="flex flex-col h-screen w-60 border-2 border-red-300 items-center">
            <p className="w-full text-center text-xl font-bold p-3">Friends</p>
            {status ? online : away}
            <hr className="mt-5 w-full border-t-2" />
            <FriendCard name="testing" level="123" picture="asdlkas"/>
        </div>
    )
}

export default FriendBar