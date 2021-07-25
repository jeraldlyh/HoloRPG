import React, { useState } from "react"
import { GiAxeSwing } from "react-icons/gi"


function RegisterForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
    const onSubmit = () => {
        console.log("submitting")
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
                            <a href="/login" className="text-lg font-semibold text-custom-misc-inactive">Login</a>
                            {/* add underline for active tab */}
                            {/* <hr className="border-t-2 border-white w-full h-px mb-5 "></hr> */}
                            <a href="/register" className="text-lg font-semibold">Register</a>                       
                        </div>
                        
                        <form className="flex flex-col w-full mb-8">
                            <div className="border-white text-left text-sm space-y-2 mb-4">
                                <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none focus:not-italic focus:text-white" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                                <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                                <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                                {/* re-pw field incorrect */}
                                <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="password" placeholder="Re-enter password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div className="flex justify-center items-center space-x-3">
                                {/* checkbox can't be styled*/}
                                <input type="checkbox" className="w-3 h-3 text-white border-white rounded bg-transparent checked:bg-transparent"></input>
                                <label className="text-xs text-white">I agree to the <a href="#" className="hover:underline">terms &amp; conditions</a></label> 
                            </div>
                        </form>
                           
                        <button className="py-3 rounded-full w-full bg-custom-button-primary text-center text-sm font-semibold hover:shadow-button cursor-pointer" onClick={onSubmit}>SIGN UP</button>
                        


                    </div>
                </div>

            </div>
        </div>
    )
}


export default RegisterForm