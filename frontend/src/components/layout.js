import React from "react"
import NavBar from "./navBar"
import ProfileBar from "./profileBar"
import Banner from "./banner"


function Layout({ children, title, profileData, profileMutate, relationshipData, accessToken }) {
    return (
        <div className="flex bg-custom-bg-main h-screen">
            <NavBar />
            <div className="flex flex-col w-full h-full z-0">
                {title ? <Banner title={title} /> : <Banner />}
                <div className="flex p-3 w-full h-full overflow-hidden">
                    {children}
                </div>
            </div>
            <ProfileBar
                profileData={profileData}
                profileMutate={profileMutate}
                relationshipData={relationshipData}
                accessToken={accessToken}
            />
        </div>
    )
}

export default Layout