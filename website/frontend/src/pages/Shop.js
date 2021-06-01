import React, { useEffect, useState } from "react"
import axiosInstance from "../axios"
import { connect } from "react-redux"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import Layout from "../components/layout/Layout"
import PageHeader from "../components/layout/PageHeader"


function Shop(props) {
    const { user } = props.auth
    const [entities, setEntities] = useState([])
    const [playerEntities, setPlayerEntities] = useState([])

    useEffect(() => {
        axiosInstance.get("/api/entity")
            .then((response) => {
                const updatedData = []
                response.data.forEach(entity => {
                    entity["quantity"] = 0
                    updatedData.push(entity)
                })
                console.log(updatedData)
                setEntities(updatedData)
            })
    }, [])

    useEffect(() => {
        axiosInstance.get(`/api/userentity/${user}`)
            .then(response => {
                setPlayerEntities(response.data)
                console.log(response.data)
            })
    }, [])

    const getEntityOwned = (entityName) => {
        for (var i = 0; i < playerEntities.length; i++) {
            if (playerEntities[i].entity === entityName) {
                return playerEntities[i].quantity
            }
        }
    }

    const increaseQuantity = (index) => {
        const oldEntities = [...entities]
        oldEntities[index].quantity += 1
        setEntities(oldEntities)
    }

    const decreaseQuantity = (index) => {
        const oldEntities = [...entities]
        oldEntities[index].quantity === 0 ? oldEntities[index].quantity : oldEntities[index].quantity -= 1
        setEntities(oldEntities)
    }

    return (
        <Layout>
            <div className="flex flex-col w-3/5 self-start">
                <PageHeader header="Shop"/>
                {
                    entities !== 0
                    ? entities.map((entity, index) => {
                        return (
                            <div key={index} className="flex flex-row border-2 w-full border-white items-center p-3 gap-x-2">
                                <div className="w-1/5 h-full text-center border-2 border-white">IMAGE</div>
                                <div className="flex flex-col justify-center w-3/5 mx-3">
                                    <div>
                                        <span className="font-bold">Entity: </span>{entity.name}
                                    </div>
                                    <div>
                                        <span className="font-bold">Income: </span>{entity.income}/hour
                                    </div>
                                    <div>
                                        <span className="font-bold">Upkeep: </span>{entity.upkeep}/week
                                    </div>
                                    <div>
                                        <span className="font-bold">Cost: </span>{entity.cost}
                                    </div>
                                </div>
                                <div className="flex flex-col w-1/5 gap-y-2">
                                    <input className="text-center" placeholder={entity.quantity}></input>
                                    <div className="flex gap-x-7 justify-center">
                                        <button className="focus:outline-none hover:outline-none hover:text-red-500" onClick={() => decreaseQuantity(index)}><FiMinusCircle  size={28}/></button>
                                        <button className="focus:outline-none hover:outline-none hover:text-custom-green" onClick={() => increaseQuantity(index)}><FiPlusCircle size={28}/></button>
                                    </div>
                                    <span className="text-center">Currently owned: {getEntityOwned(entity.name)}</span>
                                    <button className="border-2 rounded-full border-white focus:outline-none">Buy</button>
                                </div>
                            </div>
                        )
                    })
                    : null
                }
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
}) 

export default connect(mapStateToProps)(Shop)