import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { getProfile } from "../store/actions/Profile"
import { getEntityList, getUserEntity } from "../store/actions/Entity"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader(old)"
import { purchaseEntity } from "../store/actions/Shop"


function Shop(props) {
    const { user } = props.auth
    const { currency } = props.profile
    const [entities, setEntities] = useState([])
    const [playerEntities, setPlayerEntities] = useState([])

    useEffect(() => {                       // useEffect for catalogue of shop entities
        props.getEntityList()
            .then(response => {
                const updatedData = []      // Manually add quantity attribute in entity object

                response.data.forEach(entity => {
                    entity["quantity"] = 0
                    updatedData.push(entity)
                })
                setEntities(updatedData)
            })
    }, [])

    useEffect(() => {                      // useEffect for user owned entities
        props.getUserEntity(user)
            .then(response => {
                if (response) {
                    setPlayerEntities(response.data)
                }
            })
    }, [])

    const getEntityOwned = (entityName) => {
        for (var i = 0; i < playerEntities.length; i++) {
            if (playerEntities[i].entity === entityName) {
                return playerEntities[i].quantity
            }
        }
        return 0
    }

    const purchaseEntity = (entityName, quantity) => {
        props.purchaseEntity(user, entityName, quantity)
            .then(response => {
                setPlayerEntities(response.data)

                for (var i = 0; i < entities.length; i++) {         // Resets state after submission
                    if (entities[i].name === entityName) {
                        entities[i].quantity = 0
                        break
                    }
                }
                document.getElementById(entityName).value = 0       // Resets input field after submission
                props.getProfile(user)                              // Renders store after purchasing
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
        oldEntities[index].quantity = e.target.value === "" ? 0 : parseInt(e.target.value)
        setEntities(oldEntities)
    }

    const hasInsufficientCurrency = (cost, quantity) => {
        return (cost * quantity) > currency
    }

    return (
        <Layout>
            <div className="flex flex-col w-3/5 self-start">
                <PageHeader header="Shop" />
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
                                        <input className="text-center border-2 border-white bg-black" id={entity.name} value={entity.quantity} placeholder={entity.quantity} onChange={e => onManualEdit(e, index)} />
                                        <div className="flex gap-x-7 justify-center">
                                            <button className="focus:outline-none hover:outline-none hover:text-red-500" onClick={() => decreaseQuantity(index)}><FiMinusCircle size={28} /></button>
                                            <button className="focus:outline-none hover:outline-none hover:text-custom-green" onClick={() => increaseQuantity(index)}><FiPlusCircle size={28} /></button>
                                        </div>
                                        <span className="text-center">Currently owned: {getEntityOwned(entity.name)}</span>
                                        <button className="border-2 rounded-full border-white focus:outline-none disabled:bg-red-500 " onClick={() => purchaseEntity(entity.name, entity.quantity)} disabled={hasInsufficientCurrency(entity.cost, entity.quantity)}>Buy</button>
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
    auth: state.authReducer,
    profile: state.profileReducer.profile
})

const mapDispatchToProps = {
    getProfile,
    getEntityList,
    getUserEntity,
    purchaseEntity
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)