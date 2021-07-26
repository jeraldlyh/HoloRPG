import React from "react"
import { useRouter } from "next/router"

function Error(props) {
    const router = useRouter()

    return (
        <div className="bg-custom-bg-main h-screen text-white">
            <div className="flex flex-col h-full p-20">
                {/* display font for error(?) */}
                <p className="font-bold text-8xl opacity-25 tracking-widest">404{props.statusCode}</p>
                <div className="space-y-2 my-8 font-semibold">
                    <h1 className="text-4xl pb-3">Oops..</h1>
                    <p className="text-medium uppercase">Something went wrong</p>
                    <p className="font-light text-medium">The page you are looking for does not exist.</p>
                </div>
                <div className="py-3 w-28 rounded-full bg-custom-button-primary hover:bg-opacity-90 cursor-pointer" onClick={() => router.push("/")}>
                    <p className="text-center text-sm font-semibold uppercase">Home</p>
                </div>
            </div>
        </div>
    )
}

export default Error