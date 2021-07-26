import React, { useEffect, useState } from "react"
import { signOut } from "next-auth/client"
import { useRouter } from "next/router"
import { MdPerson, MdSettings } from "react-icons/md"
import { BiLogOut, BiLogIn } from "react-icons/bi"
import { GiHumanTarget, GiCrossedSwords, GiMoneyStack, GiShop, GiAxeSwing } from "react-icons/gi"
import { useAuth } from "../hooks/useAuth"
import axiosInstance from "../axios/axiosInstance"
import { withAuth } from "../hooks/withAuth"


function NavBar(props) {
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const { session: { refreshToken } } = useAuth()

    useEffect(() => {
        getCurrentIndex()
    }, [])

    const logoutUser = async () => {
        await axiosInstance.post("/api/auth/logout/", { refresh: refreshToken })
        await signOut()
        router.push("/login")
    }

    const getCurrentIndex = () => {
        const path = router.pathname.toString().replaceAll("/", "")
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
            case "stock":
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
        const isHomeButton = pageIndex === 0
        if (pageIndex === index) {
            return `flex items-center justify-center w-14 h-14 rounded bg-${isHomeButton ? "white" : "custom-misc-nav"} text-${isHomeButton ? "custom-misc-nav" : "white"}`
        }
        return `flex items-center justify-center w-14 h-14 text-custom-misc-offline rounded transition duration-200 hover:bg-custom-misc-nav hover:text-white`
    }

    return (
        <div className="bg-custom-bg-nav w-24 space-y-6 py-4 px-2 h-full shadow-white-lg z-10">
            <div className="flex flex-col justify-center items-center">
                <a href="/" className={getFocusDesign(0)}>
                    <GiAxeSwing size={24} />
                </a>
                <hr className="border-custom-color-grey w-4/5 mt-3" />
            </div>
            <div className="flex flex-col justify-center items-center space-y-5">
                <a href="/profile" className={getFocusDesign(1)}>
                    <MdPerson size={24} />
                </a>
                <a href="/bounty" className={getFocusDesign(2)}>
                    <GiHumanTarget size={24} />
                </a>
                <a href="/pvp" className={getFocusDesign(3)}>
                    <GiCrossedSwords size={24} />
                </a>
                <a href="/stock" className={getFocusDesign(4)}>
                    <GiMoneyStack size={24} />
                </a>
                <a href="/shop" className={getFocusDesign(5)}>
                    <GiShop size={24} />
                </a>
                <a href="/settings" className={getFocusDesign(6)}>
                    <MdSettings size={24} />
                </a>
                <div
                    className="flex items-center justify-center w-14 h-14 text-custom-misc-offline cursor-pointer rounded transition duration-200 hover:bg-custom-misc-nav hover:text-white"
                    onClick={() => logoutUser()}
                >
                    <BiLogOut size={24} />
                </div>
                <a href="/login" className={getFocusDesign(6)}>
                    <BiLogIn size={24} />
                </a>
            </div>
        </div>
    )
}

export default withAuth(60)(NavBar)