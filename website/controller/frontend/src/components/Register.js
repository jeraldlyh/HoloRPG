import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { FaUser, FaUnlockAlt, FaEnvelope } from "react-icons/fa"
import { registerUser } from "../actions/auth"
import { connect } from "react-redux"
import Layout from "./Layout"


function RegisterForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const onSubmit = () => {
        props.registerUser({username, email, password})
    }

    if (props.isAuthenticated && props.user) {
        return <Redirect from="/register" to="/"/>
    }

    return (
        <Layout>
            <div className="container flex justify-center">
                <form className="flex flex-col w-96 h-96 p-8 mt-5 bg-gray-700 bg-opacity-25 items-center">
                    <p className="font-bold text-2xl pb-3 text-opacity-75">
                        REGISTRATION
                    </p>
                    <div className="flex flex-row w-full items-center">
                        <span className="h-full p-2 bg-white bg-opacity-25">
                            <FaUser style={{fontSize: "20px", margin: "5px"}}/>
                        </span>
                        <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="text" placeholder="USERNAME" value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="flex flex-row w-full items-center mt-3">
                        <span className="h-full p-2 bg-white bg-opacity-25">
                            <FaUnlockAlt style={{fontSize: "20px", margin: "5px"}}/>
                        </span>
                        <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="password" placeholder="PASSWORD" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-row w-full items-center my-3">
                        <span className="h-full p-2 bg-white bg-opacity-25">
                            <FaEnvelope style={{fontSize: "20px", margin: "5px"}}/>
                        </span>
                        <input className="w-full h-full px-3 bg-gray-100 bg-opacity-75 text-left text-black placeholder-gray-900 outline-none" type="text" placeholder="EMAIL" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <button className="mt-2 py-3 w-10/12 bg-black bg-opacity-50" type="button" onClick={onSubmit}>SIGN UP</button>
                </form>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { registerUser })(RegisterForm)