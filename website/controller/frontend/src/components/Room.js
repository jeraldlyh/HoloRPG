import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import axiosInstance from "../axios"


function Room(props) {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        axiosInstance.get("/api/room")
            .then(response => {
                const data = []
                response.data.forEach(room => {
                    data.push(room)
                })
                setRooms(data)
                console.log(data)
            })
    }, [])

    const getNumOfUsers = ((users) => {
        var count = 0
        users.forEach(user => {
            if (user != "" || user != null) {
                count += 1
            }
        })
        return count
    })

    return (
        <Layout>
            <div className="flex justify-center min-w-screen border-2 border-custom-green">
                <div className="m-3">
                    <table className="">
                        <thead>
                            <tr className="uppercase">
                                <th className="py-3 px-6 border-2 border-white text-left">Room</th>
                                <th className="py-3 px-6 border-2 border-white text-left">Host</th>
                                <th className="py-3 px-6 border-2 border-white text-center">Users</th>
                                <th className="py-3 px-6 border-2 border-white text-center">Status</th>
                                <th className="py-3 px-6 border-2 border-white text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            rooms.length !== 0 ?
                                rooms.map((room, index) => {
                                    return (
                                        <tr key={index} className="hover:bg-gray-900">
                                            <td className="py-3 px-6 border-2 border-white text-left">
                                                <div className="flex items-center">
                                                    <span>{room.dungeon}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 border-2 border-white text-left">
                                                <div className="flex items-center">
                                                    <span>{room.host}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 border-2 border-white text-left">
                                                <div className="flex items-center">
                                                    <span>{getNumOfUsers([room.playerTwo, room.playerThree, room.playerFour])}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 border-2 border-white text-center">
                                                <span>{room.status}</span>
                                            </td>
                                            <td className="py-3 px-6 border-2 border-white text-center">
                                                <span>TBC</span>
                                            </td>
                                        </tr>
                                    )
                                })
                                : null
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Room