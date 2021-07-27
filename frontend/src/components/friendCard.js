import React from "react"
import { BiChat } from "react-icons/bi"

function FriendCard({ username, level, character }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                {/* Avatar */}
                <div className="relative inline-block w-12 h-12">
                    <div className="border-2 rounded-full border-custom-color-grey p-3 bg-custom-color-darkblue">
                        <img src="/assets/avatars/fighter.svg" alt="avatar" />
                        <span className="absolute bottom-1.5 right-0 inline-block w-2 h-2 bg-custom-misc-online rounded-full"></span>
                    </div>
                </div>

                {/* Username/Level/Class */}
                <div className="ml-4 text-xs text-gray-300">
                    <p className="font-semibold">{username}</p>
                    <p>Lv. {level} {character}</p>
                </div>
            </div>
            <BiChat size={16} />
        </div>
    )
}

export default FriendCard
