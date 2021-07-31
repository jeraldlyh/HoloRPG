import React, { useState, useEffect, Fragment } from "react"
import axiosInstance from "../../axios"
import _ from "lodash"
import validator from "validator"
import { signIn } from "next-auth/client"
import Loading from "../modal/loading"


function RegisterForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [agreeConditions, setAgreeConditions] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0
        })) {
            setErrorMessage("Password must be 8 characters")
        } else if (password && rePassword && password !== rePassword) {
            setErrorMessage("Passwords do not match")
        } else {
            setErrorMessage("")
        }
    }, [password, rePassword])

    useEffect(() => {
        if (email && !validator.isEmail(email)) {
            setErrorMessage("Invalid email address")
        } else {
            setErrorMessage("")
        }
    }, [email])


    const resetLabels = () => {
        setUsername("")
        setPassword("")
        setRePassword("")
        setEmail("")
    }

    const parseErrorMessage = (errors) => {
        var objToArray = _.values(errors)
        var flatArray = _.flatMap(objToArray)
        setErrorMessage(_.join(flatArray, " "))
    }

    const onSubmit = async (e) => {
        try {
            setIsLoading(true)
            e.preventDefault()

            const body = {
                username: username,
                password1: password,
                password2: rePassword,
                email: email
            }
            await axiosInstance.post("/api/auth/register/", body)                       // Register on backend
            await signIn("credentials", { username: username, password: password })     // Redirect login to nextAuth
            resetLabels()
        } catch (error) {
            parseErrorMessage(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    const isDisabled = () => {
        return !(username && password && rePassword && email && agreeConditions && password === rePassword)
    }

    return (
        isLoading
            ? <Loading />
            : (
                <Fragment>
                    <div className="flex flex-col w-full px-3 mb-6">
                        <div className="border-white text-left text-sm space-y-6 mb-6 text-white">
                            {
                                errorMessage
                                    ? <span className="flex w-full items-center justify-center text-red-500 text-sm mb-1">{errorMessage}</span>
                                    : null
                            }
                            <div className="relative">
                                <input id="username" className="peer w-full h-9 bg-transparent px-1 placeholder-transparent font-light outline-none" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                                <hr className="shadow-white"></hr>
                                <label htmlFor="username" className="absolute left-1 -top-3.5 text-xs text-gray-300 font-light transition-all
                            peer-placeholder-shown:text-sm
                            peer-placeholder-shown:text-white
                            peer-placeholder-shown:top-2
                            peer-focus:-top-3.5
                            peer-focus:text-gray-300
                            peer-focus:text-xs">Username</label>
                            </div>
                            <div className="relative">
                                <input id="email" className="peer w-full h-9 bg-transparent px-1 placeholder-transparent font-light outline-none" type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                                <hr className="shadow-white"></hr>
                                <label htmlFor="email" className="absolute left-1 -top-3.5 text-xs text-gray-300 font-light transition-all
                                peer-placeholder-shown:text-sm
                                peer-placeholder-shown:text-white
                                peer-placeholder-shown:top-2
                                peer-focus:-top-3.5
                                peer-focus:text-gray-300
                                peer-focus:text-xs">E-mail</label>
                            </div>
                            <div className="relative">
                                <input id="password" className="peer w-full h-9 bg-transparent px-1 placeholder-transparent font-light outline-none" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                <hr className="shadow-white"></hr>
                                <label htmlFor="password" className="absolute left-1 -top-3.5 text-xs text-gray-300 font-light transition-all
                                peer-placeholder-shown:text-sm
                                peer-placeholder-shown:text-white
                                peer-placeholder-shown:top-2
                                peer-focus:-top-3.5
                                peer-focus:text-gray-300
                                peer-focus:text-xs">Password</label>
                            </div>
                            <div className="relative">
                                <input id="repassword" className="peer w-full h-9 bg-transparent px-1 placeholder-transparent font-light outline-none" type="password" placeholder="Re-enter password" value={rePassword} onChange={e => setRePassword(e.target.value)} />
                                <hr className="shadow-white"></hr>
                                <label htmlFor="repassword" className="absolute left-1 -top-3.5 text-xs text-gray-300 font-light transition-all
                                peer-placeholder-shown:text-sm
                                peer-placeholder-shown:text-white
                                peer-placeholder-shown:top-2
                                peer-focus:-top-3.5
                                peer-focus:text-gray-300
                                peer-focus:text-xs">Re-enter password</label>
                            </div>
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
    )
}


export default RegisterForm