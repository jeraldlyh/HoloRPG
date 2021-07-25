import React, { useState } from "react"

function FormTabs(props)
 {
    return (

            <div className="flex flex-col w-96 p-10 bg-black bg-opacity-25 rounded-xl items-center">                
                <div className="flex w-full justify-around mb-10">
                    <a href="/login" className="text-lg font-semibold text-custom-misc-inactive">Login</a>
                    {/* add underline for active tab */}
                    {/* <hr className="border-t-2 border-white w-full h-px mb-5 "></hr> */}
                    <a href="/register" className="text-lg font-semibold">Register</a>                       
                </div> 
            </div>
    )
}

export default FormTabs
