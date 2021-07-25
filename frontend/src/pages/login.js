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
                        
                        {/* add accessible tabs, underline for active tab */}
                        {/* <hr className="border-t-2 border-white w-full h-px mb-5 "></hr> */}

                        <ul className="flex w-full justify-around mb-10 text-lg font-semibold">
                            <li><a id="default-tab" href="#login">Login</a></li>
                            <li><a href="/register" className="text-custom-misc-inactive">Register</a></li>                      
                        </ul>

                        <form className="flex flex-col w-full mb-8">
                            {/* create component for input fields */}
                            {/* peer, focus: not working // change pw dots to asterisks */}
                            <div className="border-white text-left text-sm space-y-2 mb-2">
                                <input id="username" className="peer w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none focus:not-italic focus:text-white" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                                {/* <label for="username" className="peer-placeholder-shown:uppercase">Username</label> */}

                                <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                    {/* checkbox can't be styled*/}
                                    <input type="checkbox" className="w-3 h-3 text-white border-white rounded bg-transparent checked:bg-transparent"></input>
                                    <label className="text-xs text-gray-300">Remember me</label> 
                                </div>
                                
                                <a href="#" className="text-xs text-gray-300 italic hover:underline hover:text-white">Forgot password?</a>
                            </div>

                        </form>

                        <button className="py-3 rounded-full w-full bg-custom-button-primary text-center text-sm font-semibold hover:bg-opacity-90 cursor-pointer" onClick={onSubmit}>SIGN IN</button>
                        <button className="flex items-center gap-x-4 justify-center mt-2 py-3 rounded-full w-full border border-custom-button-primary text-center text-sm font-semibold hover:shadow-button cursor-pointer" onClick={onSubmit}>
                            <FcGoogle size={20} />
                            SIGN IN WITH GOOGLE</button>


                    </div>
                </div>

            </div>
        </div>
    )
}


export default LoginForm