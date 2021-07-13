import React from "react";
import fighterIcon from "../assets/avatars/fighter.svg";
import { BiChat } from "react-icons/bi";

function FriendCard(props) {
  return (
    // <div className="flex flex-row w-full mb-1.5 px-1 items-center">
    //     <div className="flex w-1/5">
    //         <img src={props.image} alt={props.name} />
    //     </div>
    //     <div className="flex flex-col w-4/5 p-2">
    //         <span className="font-bold">{props.name}</span>
    //         <div><span className="mt-1 font-bold">Level: </span>{props.level}</div>
    //         <div><span className="font-bold">Status: </span>{props.status}</div>
    //     </div>
    // </div>

    <div className="flex items-center my-3">
      {/* avatar */}
      <div className="relative inline-block w-12 h-12">
        <div className="border-2 rounded-full border-custom-color-grey p-3">
          <img src={fighterIcon} alt="avatar" />
          <span className="absolute bottom-1.5 right-0 inline-block w-2 h-2 bg-custom-misc-online rounded-full"></span>
        </div>
      </div>

      {/* username/level/class */}
      <div className="ml-4">
        <p className="flex justify-between text-sm text-white">Player_456 
            <BiChat size={16} />
        </p>
        
        <p className="text-xs text-gray-300 font-semibold">Lv. 56 Mage</p>
        
      </div>

      {/* chat */}
      {/* <div className="items-start text-gray-300">
        <BiChat size={16} />
      </div> */}
    </div>
  );
}

export default FriendCard;
