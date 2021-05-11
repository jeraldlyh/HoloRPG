import React from "react"
import { Redirect, Link } from "react-router-dom"



export default function Header() {

    return (
        <nav>
            <div className="container w-full px-6 py-4 flex justify-between items-center bg-black">
                <a className="font-bold text-2xl" href="/">
                    HOLO
                </a>
                {/* Hidden for Large Screens */}
                <div className="block lg:hidden">
                    <button className="px-4 font-bold hover:bg-red-800" href="/login" type="submit">
                        LOGIN
                    </button>
                </div>
                {/* Hidden for Small Screens */}
                <div className="hidden lg:block">
                    <ul className="inline-flex">
                        <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                            <a className="px-4 py-0.5 font-bold" href="#">FAQ</a>
                        </li>
                        <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                            <a className="px-4 py-0.5 font-bold" href="#">COMMANDS</a>
                        </li>
                        <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                            <a className="px-4 py-0.5 font-bold" href="#">LEADERBOARDS</a>
                        </li>
                        <li className="flex bg-clip-text hover:text-transparent bg-gradient-to-r hover:from-yellow-300 hover:via-red-500 hover:to-red-900 mx-1">
                            <a className="px-4 font-bold" href="/login">LOGIN</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}