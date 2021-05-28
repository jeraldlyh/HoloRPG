import React, { useState } from "react"
import { connect } from "react-redux"

import FriendCard from "./FriendCard"

function FriendBar(props) {
    const { isAuthenticated } = props
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

    if (isAuthenticated) {
        return (
            <div className="sticky top-20 flex flex-col w-60 self-start items-center rounded-lg border-2 border-red-500 my-5 mx-10">
                <p className="w-full text-center text-xl font-bold p-3 uppercase">Friends</p>
                {status ? online : away}
                <hr className="mt-3 w-full border-t-2 border-custom-peach" />
                <FriendCard name="testing" level="123" picture="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
                <FriendCard name="testing" level="123" picture="asdlkas"/>
                <FriendCard name="testing" level="123" picture="asdlkas"/>
                <FriendCard name="testing" level="123" picture="asdlkas"/>
            </div>
        )
    }
    return <div />
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(FriendBar)