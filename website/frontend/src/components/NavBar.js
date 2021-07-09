import React from "react"
import { MdPerson, MdSettings } from "react-icons/md"
import { GiHumanTarget, GiCrossedSwords, GiMoneyStack, GiShop, GiAxeSwing } from "react-icons/gi"
import { connect } from "react-redux"
import { logoutUser } from "../store/actions/Auth"

function NavBar() {
    return (
        <div className="bg-gray-900 text-blue-100 w-24 space-y-6 py-3 px-2 h-full fixed">
            <div className="flex flex-col justify-center items-center">
                <a className="flex items-center justify-center w-14 h-14 rounded transition duration-200 hover:bg-purple-600 hover:text-white">
                    <GiAxeSwing className="text-custom-grey" size={24} />
                </a>
                <hr className="border-custom-grey w-4/5 mt-1"></hr>
            </div>
            <div className="flex flex-col justify-center items-center space-y-5">
                <a className="flex items-center justify-center w-14 h-14 rounded transition duration-200 hover:bg-purple-600 hover:text-white">
                    <MdPerson className="text-custom-grey" size={24} />
                </a>
                <a className="flex items-center justify-center w-14 h-14 rounded transition duration-200 hover:bg-purple-600 hover:text-white">
                    <GiHumanTarget className="text-custom-grey" size={24} />
                </a>
                <a className="flex items-center justify-center w-14 h-14 rounded transition duration-200 hover:bg-purple-600 hover:text-white">
                    <GiCrossedSwords className="text-custom-grey" size={24} />
                </a>
                <a className="flex items-center justify-center w-14 h-14 rounded transition duration-200 hover:bg-purple-600 hover:text-white">
                    <GiMoneyStack className="text-custom-grey" size={24} />
                </a>
                <a className="flex items-center justify-center w-14 h-14 rounded transition duration-200 hover:bg-purple-600 hover:text-white">
                    <GiShop className="text-custom-grey" size={24} />
                </a>
                <a className="flex items-center justify-center w-14 h-14 rounded transition duration-200 hover:bg-purple-600 hover:text-white">
                    <MdSettings className="text-custom-grey" size={24} />
                </a>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default NavBar