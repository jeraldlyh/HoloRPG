import React from "react";
import Card from "../Card";
import CardLight from "../CardLight";
import { IoMdCube } from "react-icons/io";
import { RiHeartPulseFill } from "react-icons/ri";
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi";

function Items() {
  return (
    <Card height="auto" width="auto" title="Items" icon={<IoMdCube />}>
      <div className="flex w-full h-full">
       <div className="w-80">
        
       </div>
      </div>
    </Card>
  );
}

export default Items;
