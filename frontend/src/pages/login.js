import React, { useState } from "react"
import { signIn } from "next-auth/client"
import { GiAxeSwing } from "react-icons/gi"
import LoginForm from "../components/landing/loginForm"


// function LoginForm(props) {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")

//     const onSubmit = async () => {
//         signIn("credentials", { username, password, callbackURL: `${process.env.NEXTAUTH_URL}/` })
//         // signIn("google", { callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/signIn` })
//     }

function Login(props){

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
            
                    <div className="flex flex-col w-96 p-10 bg-black bg-opacity-25 rounded-xl items-center">
                        
                        {/* add nav tabs, underline for active tab */}
                        {/* <hr className="border-t-2 border-white w-full h-px mb-5 "></hr> */}

                        <ul className="flex w-full justify-around mb-10 text-lg font-semibold">
                            <li><a href="#login">Login</a></li>
                            <li><a href="/register" className="text-custom-misc-inactive">Register</a></li>                      
                        </ul>

                        <LoginForm />

                    </div>
                </div>

            </div>
        </div>
    )
}


export default Login