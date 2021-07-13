import React, { useEffect, useState, Fragment } from "react"
import { useLocation } from "react-router-dom"
import { MdPerson, MdSettings } from "react-icons/md"
import { GiHumanTarget, GiCrossedSwords, GiMoneyStack, GiShop, GiAxeSwing } from "react-icons/gi"
import { connect } from "react-redux"
import { logoutUser } from "../store/actions/Auth"

function NavBar(props) {
    const location = useLocation()
    const [index, setIndex] = useState(0)
    // const { user, isAuthenticated } = props.auth
    let authenticated = true
    let user = { username: "admin" }

    useEffect(() => {
        getCurrentIndex()
    }, [])

    const getCurrentIndex = () => {
        const path = location.pathname.toString().replaceAll("/", "")
        switch (path) {
            case "":
                setIndex(0)
                break
            case "profile":
                setIndex(1)
                break
            case "bounty":
                setIndex(2)
                break
            case "pvp":
                setIndex(3)
                break
            case "stocks":
                setIndex(4)
                break
            case "shop":
                setIndex(5)
                break
            case "settings":
                setIndex(6)
                break
            default:
                break
        }
    }

    const getFocusDesign = (pageIndex) => {
        if (pageIndex === index) {
            return "flex items-center justify-center w-14 h-14 rounded bg-white text-custom-misc-nav"
        }
        return "flex items-center justify-center w-14 h-14 text-custom-misc-offline rounded transition duration-200 hover:bg-purple-600 hover:text-white"
    }

    return (
        authenticated  // To be changed to IsAuthenticated
            ? <div className="bg-custom-bg-nav w-24 space-y-6 py-3 px-2 h-full shadow-glow">
                <div className="flex flex-col justify-center items-center">
                    <a className={getFocusDesign(0)}>
                        <GiAxeSwing size={24} />
                    </a> 
                    <hr className="border-custom-color-grey w-4/5 mt-3"></hr>
                </div>
                <div className="flex flex-col justify-center items-center space-y-5">
                    <a href={`/profile/${user.username}`} className={getFocusDesign(1)}>
                        <MdPerson size={24} />
                    </a>
                    <a href="/bounty" className={getFocusDesign(2)}>
                        <GiHumanTarget size={24} />
                    </a>
                    <a href="/pvp" className={getFocusDesign(3)}>
                        <GiCrossedSwords size={24} />
                    </a>
                    <a href="/stocks" className={getFocusDesign(4)}>
                        <GiMoneyStack size={24} />
                    </a>
                    <a href="/shop" className={getFocusDesign(5)}>
                        <GiShop size={24} />
                    </a>
                    <a href="/settings" className={getFocusDesign(6)}>
                        <MdSettings size={24} />
                    </a>
                </div>
            </div>
            : <Fragment />
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(NavBar)