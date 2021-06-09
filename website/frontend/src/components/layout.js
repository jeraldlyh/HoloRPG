import React, { Fragment } from "react"
import Footer from "./footer"
import Header from "./header"
import FriendBar from "./friendBar"
import ProfileCard from "./profileCard"



function Layout(props) {
    return (
        <Fragment>
            <Header />
            <div className="flex flex-row mx-10 my-5 min-h-screen items-center justify-around">
                <FriendBar />
                { props.children }
                <ProfileCard />
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout