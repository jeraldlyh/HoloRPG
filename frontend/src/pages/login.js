import React, { useState } from "react"
import { FaUser, FaUnlockAlt } from "react-icons/fa"
import { useRouter } from "next/router"
import { useAuth } from "../context/authContext"


function LoginForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { loginUser } = useAuth()
    const router = useRouter()

    const onSubmit = async () => {
        await loginUser(username, password)
        // router.push("/")
    }

    return (
        <div className="container flex justify-center max-h-96 self-start">
            <div className="flex flex-col w-96 p-8 bg-gray-700 bg-opacity-25 items-center">
                <span className="font-bold text-2xl pb-3 text-opacity-75">
                    USER LOGIN
                </span>
                <div className="flex flex-row w-full items-center">
                    <span className="h-full p-2 bg-white bg-opacity-25">
                        <FaUser style={{ fontSize: "20px", margin: "5px" }} />
                    </span>
                    <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="text" placeholder="USERNAME" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="flex flex-row w-full items-center my-3">
                    <span className="h-full p-2 bg-white bg-opacity-25">
                        <FaUnlockAlt style={{ fontSize: "20px", margin: "5px" }} />
                    </span>
                    <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="password" placeholder="PASSWORD" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mt-2 py-3 w-10/12 bg-black bg-opacity-50 text-center cursor-pointer" onClick={onSubmit}>LOGIN</div>
                <p className="my-3 text-sm text-gray-500">Forgot Password? <a href="#" className="underline hover:text-white">Click here</a></p>

                <hr className="h-0.5 w-full bg-gray-100 bg-opacity-75" />
                <a className="mt-3 py-3 w-10/12 bg-black bg-opacity-50 text-center" href="/register">CREATE AN ACCOUNT</a>
            </div>
        </div>
    )
}


export default LoginForm