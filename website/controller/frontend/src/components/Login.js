import React, { Component } from 'react'

export default class Login extends Component {
    // onSubmit()

    render() {
        return (
            <div className="container flex justify-center">
                <form className="flex flex-col w-80 p-8 m-5 bg-gray-200 bg-opacity-25 items-center">
                    <p className="font-bold text-2xl pb-3">
                        USER LOGIN
                    </p>
                    <div className="flex flex-row items-center">
                        <span className="h-full px-3 bg-white bg-opacity-25">
                            <i className="py-2 fa fa-user" style={{fontSize : "25px"}}></i>
                        </span>
                        <input className="w-full h-full bg-gray-900 bg-opacity-50 text-center placeholder-gray-100 outline-none placeholder-opacity-20" type="text" placeholder="USERNAME"/>
                    </div>
                    <div className="flex flex-row items-center my-3">
                        <span className="h-full px-3 bg-white bg-opacity-25">
                            <i className="py-2 fa fa-lock" style={{fontSize : "28px"}}></i>
                        </span>
                        <input className="w-full h-full bg-gray-900 bg-opacity-50 text-center placeholder-gray-100 outline-none placeholder-opacity-20" type="text" placeholder="PASSWORD"/>
                    </div>
                    <button className="py-1 w-44 bg-gray-100 text-gray-900 bg-opacity-75" type="submit">LOGIN</button>
                </form>
            </div>
        )
    }
}