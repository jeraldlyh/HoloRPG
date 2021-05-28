import React from "react"
import FriendBar from "./FriendBar"
import ProfileCard from "./ProfileCard"



function Layout(props) {
    return (
        <div className="flex flex-row mx-10 my-5 min-h-screen items-center justify-around">
            <FriendBar />
            { props.children }
            <ProfileCard />
        </div>
    )
}


export default Layout