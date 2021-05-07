import React, { Component } from 'react'

export default class Login extends Component {
    // onSubmit()

    render() {
        return (
            <div className="flex w-full justify-center">
                <form className="flex flex-col w-80 border p-10 m-5">
                    <div className="flex flex-row items-center">
                        <span className="h-full px-3 bg-white bg-opacity-25">
                            <i className="fa fa-user" style={{fontSize : "25px"}}></i>
                        </span>
                        <input className="my-3 w-full h-full bg-white bg-opacity-75 text-center placeholder-white" type="text" placeholder="Username"/>
                    </div>
                    <div>
                        <input className="my-3 w-full h-full bg-white bg-opacity-75 text-center placeholder-white" type="password" placeholder="Password"/>
                    </div>
                    <button className="my-3 mx-5 py-1 bg-white bg-opacity-10" type="submit">LOGIN</button>
                </form>
            </div>
        )
    }
}