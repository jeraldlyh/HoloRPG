import React, { useState, useEffect, Fragment } from "react"
import { connect } from "react-redux"
import FriendCard from "./FriendCard"
import { getRelationship } from "../store/actions/Relationship"

function FriendBar(props) {
    const { isAuthenticated, username } = props
    const [status, setStatus] = useState(true)
    const [friends, setFriends] = useState([])

    useEffect(() => {
        if (isAuthenticated) {
            props.getRelationship(username)
                .then(response => setFriends(response.data))
        }
    }, [])

    const onClick = () => {
        setStatus(!status)
    }

    const online = (
        <button className="rounded-full mt-1 font-bold focus:outline-none w-20 py-1 text-center bg-custom-green" onClick={onClick}>Online</button>
    )

    const away = (
        <button className="rounded-full font-bold focus:outline-none w-20 py-1 text-center bg-custom-orange" onClick={onClick}>Away</button>
    )

    if (isAuthenticated) {
        return (
            <div className="sticky top-20 flex flex-col w-60 self-start items-center rounded-lg border-2 border-red-500 my-5 mx-10">
                <span className="w-full text-center text-xl font-bold p-3 uppercase">Friends</span>
                {status ? online : away}
                <hr className="mt-3 w-full border-t-2 border-red-500" />
                {
                    friends.length !== 0
                    ? friends.map((friend, index) => {
                        return (
                            <Fragment key={index}>
                                <FriendCard 
                                    name={friend.user}
                                    level={friend.level}
                                    image={friend.image}
                                    status={friend.status}
                                />
                                {
                                    index !== friends.length - 1
                                    ? <hr className="w-2/3 border-t-2 border-red-500"/>
                                    : null
                                }
                            </Fragment>
                        )
                    })
                    : <div className="flex h-64 items-center">
                        <span className="text-sm">You currently have no friends</span>
                    </div>
                }
            </div>
        )
    }
    return null
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    username: state.authReducer.user
})

export default connect(mapStateToProps, { getRelationship })(FriendBar)