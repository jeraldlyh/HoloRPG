import React from "react"
import FriendBar from "./FriendBar"
import ProfileCard from "./ProfileCard"



function Layout(props) {
    return (
        // <div className="grid grid-cols-3 mx-10 my-5 min-h-screen justify-items-center" style={{gridTemplateColumns: "255px 1fr 255px"}}>
        <div className="flex flex-row mx-10 my-5 min-h-screen items-center justify-around">
            <FriendBar />
            { props.children }
            <ProfileCard />
        </div>
    )
}


export default Layout