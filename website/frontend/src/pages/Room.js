import React, { useState, useEffect } from "react"
import Layout from "../components/layout/Layout"
import axiosInstance from "../axios"
import Modal from "../components/modals/Modal"


function Room() {
    const [rooms, setRooms] = useState([])
    const [showModal, setModal] = useState(false)
    const [users, setUsers] = useState([])


    useEffect(() => {
        axiosInstance.get("/api/room")
            .then(response => {
                setRooms(response.data)
            })
            .then(() => {
                axiosInstance.get("/api/profile")
                    .then(response => {
                        setUsers(response.data)
                    })
            })
            .catch(error => {
                console.log(error)
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

    const getProfilePics = (room) => {
        const pictures = []
        room.profile_pictures.length !== 0 ?
        room.profile_pictures.forEach((picture, index) => {
            const image = require(`../assets/${picture}.svg`).default
            pictures.push(
                <img key={index} className="w-6 h-6 rounded-full transform hover:scale-125 z-0" src={image}></img>
            )
        })
        : null
        return pictures
    }

    const toggleModal = () => {
        setModal(!showModal)
    }

    return (
        <Layout>
            <div className="relative self-start sticky top-20 my-5 min-w-screen border-2 border-custom-green">
                <Modal show={showModal} handleToggle={toggleModal}>
                    <div className="mt-16 w-full px-3">
                        <input className="w-full h-10 placeholder text-center" placeholder="Search for username..."></input>
                    </div>
                </Modal>

                <div className="flex justify-around mx-6 mt-3">
                    <button className="text-lg w-28 font-bold uppercase px-2 border-2 border-white" onClick={toggleModal}>Create</button>
                    <button className="text-lg w-28 font-bold uppercase px-2 border-2 border-white">Join</button>
                </div>
                <table className="m-3">
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
                                            <div className="flex items-center w-max">
                                                {getProfilePics(room)}
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
        </Layout>
    )
}

export default Room