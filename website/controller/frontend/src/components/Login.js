import React, { Fragment, useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useHistory } from "react-router-dom"
import { FaUser, FaUnlockAlt } from "react-icons/fa"
import LoginAPIService from "./LoginAPIService"
import Header from "./layout/Header"
import Footer from "./layout/Footer"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useCookies(["token"])
    let history = useHistory()

    useEffect(() => {
        if (token["token"]) {
            history.push("/home")
        }
    }, [token])

    const handleLogin = () => {
        LoginAPIService.LoginUser({username, password})
        .then(response => setToken("token", response.token))
        .catch(error => console.log(error))
    }

    return (
        <Fragment>
            <Header />
            <div className="container flex justify-center">
                <form className="flex flex-col w-96 p-8 mt-5 bg-gray-700 bg-opacity-25 items-center">
                    <p className="font-bold text-2xl pb-3 text-opacity-75">
                        USER LOGIN
                    </p>
                    <div className="flex flex-row w-full items-center">
                        <span className="h-full p-2 bg-white bg-opacity-25">
                            <FaUser style={{fontSize: "20px", margin: "5px"}}/>
                        </span>
                        <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="text" placeholder="USERNAME" value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="flex flex-row w-full items-center my-3">
                        <span className="h-full p-2 bg-white bg-opacity-25">
                            <FaUnlockAlt style={{fontSize: "20px", margin: "5px"}}/>
                        </span>
                        <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="password" placeholder="PASSWORD" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className="mt-2 py-3 w-10/12 bg-black bg-opacity-50" type="button" onClick={handleLogin}>LOGIN</button>
                    <p className="my-3 text-sm text-gray-500">Forgot Password? <a href="#" className="underline hover:text-white">Click here</a></p>

                    <hr className="h-0.5 w-full bg-gray-100 bg-opacity-75" />
                    <button className="mt-5 py-3 w-10/12 bg-black bg-opacity-50" type="submit">CREATE AN ACCOUNT</button>
                </form>
            </div>
            <Footer />
        </Fragment>
    )
}