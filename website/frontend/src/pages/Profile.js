import React from "react";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { IoStatsChart } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi"
import { IoMdCube } from "react-icons/io"
import { FaCoins } from "react-icons/fa"
import { FaDungeon } from "react-icons/fa"
import { GiSwordsPower } from "react-icons/gi"

export default function Profile() {
  return (
    <Layout>
      <div className="flex-col w-full h-full p-5">

        <Card height="3/5" title="Statistics" icon={<IoStatsChart />}>
              
        </Card>
        

        <Card height="2/5" title="Items" icon={<IoMdCube />}>
        
        </Card>



        <Card height="3/5" title="Stocks" icon={<GiMoneyStack />}>
        
        </Card>


        <Card height="3/5" title="Entities" icon={<FaCoins />}>
              
        </Card>


        <Card height="3/5" title="Dungeon" icon={<FaDungeon />}>
              
        </Card>


        <Card height="3/5" title="PVP" icon={<GiSwordsPower />}>
              
        </Card>

      </div>

    </Layout>
  );
}
