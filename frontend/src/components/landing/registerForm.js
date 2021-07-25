import React, { useState } from "react"

function RegisterForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
    const onSubmit = () => {
        console.log("submitting")
    }

    return (
        <div>
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
    )
}


export default RegisterForm