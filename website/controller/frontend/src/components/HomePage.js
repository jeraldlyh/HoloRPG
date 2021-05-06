import React from "react"


export default function HomePage() {
    return (
        <div className="md:flex flex-col lg:grid grid-cols-3 grid-rows-4">
            <div className="row-start-1 col-span-2 max-w py-4 px-8 mx-52 my-5 border border-green-300 rounded-lg">
                <h2 className="font-bold">CLASSES</h2>
                <p className="mt-2">4 types of classes with individual unique traits are available</p>
            </div>
            <div className="col-start-2 col-span-2 max-w py-4 px-8 mx-52 my-5 border border-yellow-300 rounded-lg">
                <h2 className="font-bold">ECONOMY</h2>
                <p className="mt-2">Global economy where a robust trading system is in place for players to trade freely with each other</p>
            </div>
            <div className="col-span-2 max-w py-4 px-8 mx-52 my-5 border border-yellow-500 rounded-lg">
                <h2 className="font-bold">COMPETITION</h2>
                <p className="mt-2">Compete with players to claim the highest rank on the leaderboards</p>
            </div>
            <div className="col-start-2 col-span-2 max-w py-4 px-8 mx-52 my-5 border border-red-300 rounded-lg">
                <h2 className="font-bold">EVENTS</h2>
                <p className="mt-2">Weekly events are hosted to enhance player's experience</p>
            </div>
        </div>
    )
}