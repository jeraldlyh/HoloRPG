import React, { useState } from "react"

function Error(props) {
    return (
        <div className="flex bg-custom-bg-main h-screen text-white">
            <div className="flex container ml-24 mt-40">                
                <div className="flex flex-col">
                    {/* display font for error(?) */}
                    <p className="font-bold text-8xl opacity-25 tracking-widest">404</p>
                    <div className="space-y-2 my-8">
                        <h1 className="font-medium text-4xl pb-3">Oops..</h1>
                        <p className="font-semibold text-medium uppercase">Something went wrong</p>
                        <p className="font-light text-medium">The page you are looking for does not exist.</p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="py-3 rounded-full w-full bg-custom-button-primary text-center text-sm font-semibold uppercase hover:bg-opacity-90 cursor-pointer">
                            <a href="#">Home</a></button>
                        <button className="py-3 rounded-full w-full border border-custom-button-primary text-center text-sm font-semibold uppercase hover:shadow-button cursor-pointer">
                            <a href="#">Go back</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error