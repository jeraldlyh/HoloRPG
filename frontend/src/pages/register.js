import React, { useState } from "react"
import { GiAxeSwing } from "react-icons/gi"
import RegisterForm from "../components/landing/registerForm"
import FormTabs from "../components/landing/formTabs"


function Register(props) {
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const [email, setEmail] = useState("")
    
    // const onSubmit = () => {
    //     console.log("submitting")
    // }

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
                        
                    <ul className="flex w-full justify-around mb-10 text-lg font-semibold">
                        <li><a href="/login" className="text-custom-misc-inactive">Login</a></li>
                        <li><a href="#register">Register</a></li>                      
                    </ul>
                        
                       <RegisterForm/>

                    </div>
                </div>

            </div>
        </div>
    )
}


export default Register