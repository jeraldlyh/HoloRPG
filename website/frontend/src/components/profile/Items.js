import React from "react";
import Card from "../Card";
import CardLight from "../CardLight";
import ItemCard from "./ItemCard";
import { IoMdCube } from "react-icons/io";
import { RiHeartPulseFill } from "react-icons/ri";
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi";

function Items() {
  return (
    <Card height="auto" width="auto" title="Items" icon={<IoMdCube />}>
      <div className="flex text-white">
      <div className="flex flex-col w-auto ml-1 mr-10 ">
      {/* enhancements */}
        <p className="text-xs text-custom-color-lightgrey mb-3">Total enhancements</p>
        
        <div className="flex items-center h-auto space-x-6 mb-6">
          <div className="flex flex-col items-center justify-center">
            <RiHeartPulseFill size={24} />
            <p className="text-sm mt-2.5">+62</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <GiPiercingSword size={24} />
            <p className="text-sm mt-2.5">+30</p>
          </div>
          <div className="flex flex-col items-center justify-center">
           <GiCheckedShield size={24} />
            <p className="text-sm mt-2.5">+120</p>
          </div>
        </div>

        {/* total items */}
        <p className="text-xs text-custom-color-lightgrey mb-3">Total items</p>
                
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold">12</p>                                 
        </div>
      </div>
      <div>
       
      </div>

      <div className="flex w-full justify-around">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
      </div>

      
    </Card>
  );
}

export default Items;
