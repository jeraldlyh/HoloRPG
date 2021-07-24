import React, { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/client"
import Layout from "../components/layout"

function LoginForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async () => {
        signIn("credentials", { username, password, callbackURL: `${process.env.NEXTAUTH_URL}/` })
        // signIn("google", { callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/signIn` })
    }

    return (
        <div className="flex bg-custom-bg-main h-screen text-white">
            <div className="container flex justify-center max-h-96 self-start">
                <div className="flex flex-col w-96 p-10 bg-black bg-opacity-25 rounded-lg items-center">
                    <div classname="flex justify-around gap-x-5">
                        <button className="font-semibold text-lg mb-3 text-white">Login</button>
                        <button className="font-semibold text-lg mb-3 text-white">Register</button>
                    </div>
                    <div className="flex flex-col w-full items-center space-y-2 text-left border-white font-light italic text-sm">
                        <div className="flex items-center w-full h-10 rounded-lg px-3 border glow-white ">Username </div>
                        <div className="flex items-center w-full h-10 rounded-lg px-3 border glow-white ">Password </div>
                        {/* <input className="w-10/12 h-full px-3 border-white text-left text-white placeholder-gray-900" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                        <input className="w-10/12 h-full px-3 border-white text-left text-white placeholder-gray-900" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /> */}
                    </div>
                    <div className="flex justify-between space-x-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 border border-white rounded-sm"></div>
                            <p className="my-3 text-sm text-gray-300">Remember me</p> 
                        </div>
                         
                        <p className="my-3 text-sm text-gray-300">Forgot Password?</p>
                        {/* <p className="my-3 text-sm text-gray-300">Forgot Password? <a href="#" className="underline hover:text-white">Click here</a></p> */}
                    </div>
                    <button className="mt-2 py-3 rounded-full w-full bg-custom-button-primary text-center text-xs font-semibold shadow-button cursor-pointer" onClick={onSubmit}>SIGN IN</button>
                    <button className="flex items-center gap-x-3 justify-center mt-2 py-3 rounded-full w-full border border-custom-button-primary text-center text-xs font-semibold shadow-button cursor-pointer" onClick={onSubmit}>
                        <FcGoogle size={20} />
                        SIGN IN WITH GOOGLE</button>


                </div>
            </div>
        </div>
    )
}


export default LoginForm