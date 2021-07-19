import React from "react"
import NavBar from "./navBar"
import ProfileBar from "./profileBar"
import Banner from "./banner"


function Layout(props) {
    return (
        <div className="flex bg-custom-bg-main h-screen">
            <NavBar />
            <div className="flex flex-col w-full h-full">
                {props ? <Banner title={props.title} /> : <Banner />}
                <div className="flex p-3 w-full h-full overflow-hidden">
                    {props.children}
                </div>
            </div>
            <ProfileBar />
        </div>
    )
}

export default Layout