import React, { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/client"
import { GiAxeSwing } from "react-icons/gi"


function LoginForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async () => {
        signIn("credentials", { username, password, callbackURL: `${process.env.NEXTAUTH_URL}/` })
        // signIn("google", { callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/signIn` })
    }

    return (
        <div className="flex bg-custom-bg-main h-screen text-white">
            <div className="flex container justify-center max-h-96 self-start">
                
                <div className="flex flex-col">
                    
                    <div className="flex justify-center mt-16">
                        <GiAxeSwing size={36} />
                    </div>
                    <div className="flex text-4xl justify-around my-10">
                        <span>H</span> <span>O</span> <span>L</span> <span>O</span>
                    </div>
            
                    <div className="flex flex-col w-96 p-10 bg-black bg-opacity-25 rounded-lg items-center">
                        
                        <div className="flex w-full justify-around mb-10">
                            <button className="text-lg font-semibold">Login</button>
                            {/* add underline for active tab */}
                            {/* <hr className="border-t-2 border-white w-full h-px mb-5 "></hr> */}
                            <button className="text-lg font-semibold text-custom-misc-inactive">Register</button>                       
                        </div>
                        
                        <div className="flex flex-col w-full  space-y-2 text-left border-white text-sm">
                            <input id="username" className="peer w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                            {/* <label for="username" className="peer-placeholder-shown:uppercase">Username</label> */}

                            <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>

                        </div>

                        <div className="flex w-full justify-between">
                            <div className="flex items-center space-x-2">
                                {/* checkbox can't be styled*/}
                                <input type="checkbox" className="w-3 h-3 text-white border-white rounded bg-transparent checked:bg-transparent"></input>
                                <label className="my-3 text-xs text-gray-300">Remember me</label> 
                            </div>
                            
                            <a href="#" className="my-3 text-xs text-gray-300 italic hover:underline hover:text-white">Forgot Password?</a>
                            {/* <p className="my-3 text-sm text-gray-300">Forgot Password? <a href="#" className="underline hover:text-white">Click here</a></p> */}
                        </div>

                        <button className="mt-2 py-3 rounded-full w-full bg-custom-button-primary text-center text-sm font-semibold shadow-button cursor-pointer" onClick={onSubmit}>SIGN IN</button>
                        <button className="flex items-center gap-x-4 justify-center mt-2 py-3 rounded-full w-full border border-custom-button-primary text-center text-sm font-semibold shadow-button cursor-pointer" onClick={onSubmit}>
                            <FcGoogle size={20} />
                            SIGN IN WITH GOOGLE</button>


                    </div>
                </div>

            </div>
        </div>
    )
}


export default LoginForm