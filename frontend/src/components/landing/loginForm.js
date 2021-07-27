import React, { useState, useEffect, Fragment } from "react"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/client"


function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberUser, setRememberUser] = useState(false)

    useEffect(() => {
        const username = localStorage.getItem("username")
        if (username) {
            setUsername(username)
            setRememberUser(true)
        }
    }, [])

    const normalLogin = async () => {
        signIn("credentials", { username, password, callbackURL: `${process.env.NEXTAUTH_URL}/` })
    }

    const googleLogin = async () => {
        signIn("google", { callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/signIn` })
    }

    const isDisabled = () => {
        return !(username && password)
    }

    const handleRememberUser = (e) => {
        if (rememberUser) {
            setRememberUser(false)
            localStorage.removeItem("username")
        } else {
            setRememberUser(true)
            localStorage.setItem("username", username)
        }
    }

    return (
        <Fragment>
            <div className="flex flex-col w-full px-3 mb-5">
                {/* peer, focus: not working // change pw dots to asterisks */}
                <div className="border-white text-left text-sm space-y-6 mb-4">
                    <div className="relative">
                        <input id="username" className="peer w-full h-9 bg-transparent px-1 placeholder-gray-300 placeholder-transparent font-light outline-none focus:text-white" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                        <hr className="shadow-white"></hr>
                        <label htmlFor="username" className="absolute left-1 -top-3.5 text-xs text-gray-100 font-light transition-all
                            peer-placeholder-shown:text-sm
                            peer-placeholder-shown:text-gray-300
                            peer-placeholder-shown:top-2
                            peer-focus:-top-3.5
                            peer-focus:text-gray-100
                            peer-focus:text-xs">Username</label>
                    </div>
                    <div className="relative">
                        <input id="password" className="peer w-full h-9 bg-transparent px-1 placeholder-gray-300 placeholder-transparent font-light outline-none focus:text-white" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <hr className="shadow-white"></hr>
                        <label htmlFor="password" className="absolute left-1 -top-3.5 text-xs text-gray-100 font-light transition-all
                                peer-placeholder-shown:text-sm
                                peer-placeholder-shown:text-gray-300
                                peer-placeholder-shown:top-2
                                peer-focus:-top-3.5
                                peer-focus:text-gray-100
                                peer-focus:text-xs">Password</label>
                    </div>
                </div>
<<<<<<< HEAD
=======

>>>>>>> Update button colors
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {/* checkbox can't be styled*/}
                        <input type="checkbox" className="w-3 h-3 text-white border-white rounded bg-transparent checked:bg-transparent" checked={rememberUser} onChange={e => handleRememberUser(e)}></input>
                        <label className="text-xs text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="text-xs text-gray-300 italic hover:underline hover:text-white">Forgot password?</a>
                </div>
            </div>
            <button className="py-3 rounded-full w-full text-white bg-custom-button-primary text-center text-sm font-semibold uppercase hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" onClick={normalLogin} disabled={isDisabled()}>
                Sign In
            </button>
            <div className="flex items-center gap-x-4 justify-center mt-2 py-3 rounded-full w-full text-white border border-custom-button-primary text-center text-sm font-semibold uppercase hover:shadow-button cursor-pointer" onClick={googleLogin}>
                <FcGoogle size={20} />
                Sign in with Google
            </div>
        </Fragment>
    )
}


export default LoginForm