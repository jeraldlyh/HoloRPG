import React, { Fragment } from "react"
import { connect } from "react-redux"
import { logoutUser } from "../../store/actions/auth"



function Header(props) {
    const { user, isAuthenticated } = props.auth

    const userNavBar = (
        <Fragment>
            {/* Hidden for Large Screens */}
            <div className="block lg:hidden">
                <ul className="inline-flex">
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <button className="px-4 py-0.5 font-bold uppercase" type="button" onClick={props.logoutUser}>Logout</button>
                    </li>
                </ul>
            </div>
            {/* Hidden for Small Screens */}
            <div className="hidden lg:block">
                <ul className="inline-flex">
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="/faq"><button className="px-4 py-0.5 font-bold uppercase" type="button">FAQ</button></a>
                    </li>
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="#"><button className="px-4 py-0.5 font-bold uppercase" type="button">Commands</button></a>
                    </li>
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="/shop"><button className="px-4 py-0.5 font-bold uppercase" type="button">Shop</button></a>
                    </li>
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="/leaderboard"><button className="px-4 py-0.5 font-bold uppercase" type="button">Leaderboards</button></a>
                    </li>
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="#"><button className="px-4 py-0.5 font-bold uppercase" type="button">Profile</button></a>
                    </li>
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <button className="px-4 font-bold uppercase" type="button" onClick={props.logoutUser}>Logout</button>
                    </li>
                </ul>
            </div>
        </Fragment>
    )

    const guestNavBar = (
        <Fragment>
            {/* Hidden for Large Screens */}
            <div className="block lg:hidden">
                <ul className="inline-flex">
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="/login"><button className="px-4 font-bold uppercase" type="button">Login</button></a>
                    </li>
                </ul>
            </div>
            {/* Hidden for Small Screens */}
            <div className="hidden lg:block">
                <ul className="inline-flex">
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="/faq"><button className="px-4 py-0.5 font-bold uppercase">FAQ</button></a>
                    </li>
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="#"><button className="px-4 py-0.5 font-bold uppercase">Commands</button></a>
                    </li>
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="/leaderboard"><button className="px-4 py-0.5 font-bold uppercase">Leaderboards</button></a>
                    </li>
                    <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                        <a href="/login"><button className="px-4 font-bold uppercase">Login</button></a>
                    </li>
                </ul>
            </div>
        </Fragment>
    )

    return (
        <div className="container sticky top-0 min-w-full px-6 py-4 flex justify-between items-center bg-black">
            <a className="font-bold text-2xl" href="/">
                HOLO
            </a>
            {/* Hidden for Large Screens */}
            <div className="block lg:hidden">
                {isAuthenticated ? userNavBar : guestNavBar}
            </div>
            {/* Hidden for Small Screens */}
            <div className="hidden lg:block">
                {isAuthenticated ? userNavBar : guestNavBar}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Header)