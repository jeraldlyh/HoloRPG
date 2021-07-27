import React, { useState, Fragment } from "react"

function RegisterForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [email, setEmail] = useState("")
    const [agreeConditions, setAgreeConditions] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)

    const resetLabels = () => {
        setUsername("")
        setPassword("")
        setRePassword("")
        setEmail("")
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== rePassword) {      // Reset password labels
            setIsPasswordError(true)
            setPassword("")
            setRePassword("")
        } else {
            console.log("submitting")
            resetLabels()
        }
    }

    const isDisabled = () => {
        return !(username && password && rePassword && email && agreeConditions)
    }

    return (
        <Fragment>
            <div className="flex flex-col w-full mb-5">
                <div className="border-white text-left text-sm space-y-2 mb-4">
                    <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none focus:not-italic focus:text-white" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    {/* re-pw field incorrect */}
                    <input className="w-full h-10 bg-transparent px-4 rounded-lg border shadow-white placeholder-gray-300 font-light italic outline-none" type="password" placeholder="Re-enter password" value={rePassword} onChange={e => setRePassword(e.target.value)} />
                    {
                        isPasswordError
                            ? <p className="text-red-500 text-sm -mt-1 text-center">Passwords do not match!</p>
                            : null
                    }
                </div>
                <div className="flex justify-center items-center space-x-3">
                    {/* checkbox can't be styled*/}
                    <input type="checkbox" className="w-3 h-3 text-white border-white rounded bg-transparent checked:bg-transparent" checked={agreeConditions} onChange={e => setAgreeConditions(!agreeConditions)}></input>
                    <label className="text-xs text-white">I agree to the <a href="#" className="hover:underline">terms &amp; conditions</a></label>
                </div>
            </div>
            <button className="py-3 rounded-full w-full text-white bg-custom-button-primary text-center text-sm font-semibold uppercase hover:shadow-button disabled:opacity-50 disabled:cursor-not-allowed" onClick={onSubmit} disabled={isDisabled()}>Sign Up</button>
        </Fragment>
    )
}


export default RegisterForm