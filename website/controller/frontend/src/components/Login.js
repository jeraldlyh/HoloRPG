import React, { Component } from "react"
import { FaUser, FaUnlockAlt } from "react-icons/fa"

export default class Login extends Component {
    // onSubmit()

    render() {
        return (
            <div className="container flex justify-center">
                <form className="flex flex-col w-96 p-8 mt-5 bg-gray-700 bg-opacity-25 items-center">
                    <p className="font-bold text-2xl pb-3 text-opacity-75">
                        USER LOGIN
                    </p>
                    <div className="flex flex-row w-full items-center">
                        <span className="h-full p-2 bg-white bg-opacity-25">
                            <FaUser style={{fontSize: "20px", margin: "5px"}}/>
                        </span>
                        <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="text" placeholder="USERNAME"/>
                    </div>
                    <div className="flex flex-row w-full items-center my-3">
                        <span className="h-full p-2 bg-white bg-opacity-25">
                            <FaUnlockAlt style={{fontSize: "20px", margin: "5px"}}/>
                        </span>
                        <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="text" placeholder="PASSWORD"/>
                    </div>
                    <button className="mt-2 py-3 w-10/12 bg-black bg-opacity-50" type="submit">LOGIN</button>
                    <p className="my-3 text-sm text-gray-500">Forgot Password? <a href="#" className="underline hover:text-white">Click here</a></p>

                    <div className="h-0.5 w-full bg-gray-100 bg-opacity-75"></div>
                    <button className="mt-5 py-3 w-10/12 bg-black bg-opacity-50" type="submit">CREATE AN ACCOUNT</button>
                </form>
            </div>
        )
    }
}