import React, { useEffect, useState } from "react"
import axiosInstance from "../axios"
import { connect } from "react-redux"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import Layout from "../components/layout/Layout"
import PageHeader from "../components/layout/PageHeader"
import profile from "../reducers/profile"


function Shop(props) {
    const { user } = props.auth
    const { currency } = props.profile
    const [entities, setEntities] = useState([])
    const [playerEntities, setPlayerEntities] = useState([])

    useEffect(() => {
        axiosInstance.get("/api/entity")
            .then((response) => {
                const updatedData = []      // Manually add quantity attribute in entity object

                response.data.forEach(entity => {
                    entity["quantity"] = 0
                    updatedData.push(entity)
                })
                setEntities(updatedData)
            })
    }, [])

    useEffect(() => {
        axiosInstance.get(`/api/userentity/${user}`)
            .then(response => {
                setPlayerEntities(response.data)
            })
    }, [])

    const getEntityOwned = (entityName) => {
        for (var i = 0; i < playerEntities.length; i++) {
            if (playerEntities[i].entity === entityName) {
                return playerEntities[i].quantity
            }
        }
    }

    const purchaseEntity = (entityName, quantity) => {
        const body = {
            user: user,
            entity: entityName,
            quantity: quantity
        }
        axiosInstance.post("/api/userentity/", body)
            .then(response => {
                setPlayerEntities(response.data)
                document.getElementById(entityName).value = 0       // Resets input field after submission
            })
            .catch(error => {
                console.log(error)
            })
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

    const onManualEdit = (e, index) => {
        const oldEntities = [...entities]
        oldEntities[index].quantity = parseInt(e.target.value) >= 0 ? parseInt(e.target.value) : oldEntities[index].quantity
        setEntities(oldEntities)
    }

    const hasInsufficientCurrencyError = (cost, quantity) => {
        return (cost * quantity) > currency
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
                                    <input className="text-center border-2 border-white bg-black" id={entity.name} value={entity.quantity} placeholder={entity.quantity} onChange={e => onManualEdit(e, index)}  />
                                    <div className="flex gap-x-7 justify-center">
                                        <button className="focus:outline-none hover:outline-none hover:text-red-500" onClick={() => decreaseQuantity(index)}><FiMinusCircle  size={28}/></button>
                                        <button className="focus:outline-none hover:outline-none hover:text-custom-green" onClick={() => increaseQuantity(index)}><FiPlusCircle size={28}/></button>
                                    </div>
                                    <span className="text-center">Currently owned: {getEntityOwned(entity.name)}</span>
                                    <button className="border-2 rounded-full border-white focus:outline-none disabled:bg-red-500 " onClick={() => purchaseEntity(entity.name, entity.quantity)} disabled={hasInsufficientCurrencyError(entity.cost, entity.quantity)}>Buy</button>
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
    auth: state.auth,
    profile: state.profile.profile
}) 

export default connect(mapStateToProps)(Shop)