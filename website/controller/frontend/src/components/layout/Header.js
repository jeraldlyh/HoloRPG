import React from "react"
import { Link as RouterLink } from "react-router-dom"



export default function Header() {

    return (
        <nav>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center bg-black">
                <a className="font-bold text-2xl" href="/">
                    HOLO
                </a>
                {/* Hidden for Large Screens */}
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 border rounded border-gray-600 hover:text-gray-400 hover:border-teal-500 appearance-none focus:outline-none">
                        test
                    </button>
                </div>
                {/* Hidden for Small Screens */}
                <div className="hidden lg:block">
                    <ul className="inline-flex">
                        <li><a className="px-4 font-bold" href="#">FAQ</a></li>
                        <li><a className="px-4 font-bold" href="#">COMMANDS</a></li>
                        <li><a className="px-4 font-bold" href="#">LEADERBOARDS</a></li>
                        <li><a className="px-4 font-bold" href="#">LOGIN</a></li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}