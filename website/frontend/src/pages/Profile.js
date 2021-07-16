import React from "react"
import Card from "../components/Card"
import Layout from "../components/Layout"
import Items from "../components/profile/Items"
import { GiMoneyStack } from "react-icons/gi"
import { FaCoins } from "react-icons/fa"
import { FaDungeon } from "react-icons/fa"
import { GiSwordsPower } from "react-icons/gi"
import Statistics from "../components/profile/Statistics"

export default function Profile() {
    return (
        <Layout>
            <div className="text-white font-semibold m-5 space-x-12">
                <span className="">Overview</span>
                <span className="text-custom-misc-inactive">Stocks</span>
                <span className="text-custom-misc-inactive">Entities</span>
                <span className="text-custom-misc-inactive">Battles</span>
            </div>

            <div className="flex flex-col w-full h-full gap-y-3 overflow-y-auto scrollbar-hide">
                <Statistics />

               <Items />

                <Card height="auto" width="full" title="Stocks" icon={<GiMoneyStack />}>

                </Card>

                <Card height="auto" width="full" title="Entities" icon={<FaCoins />}>

                </Card>

                <Card height="auto" width="full" title="Dungeon" icon={<FaDungeon />}>

                </Card>

                <Card height="auto" width="full" title="PVP" icon={<GiSwordsPower />}>

                </Card>

            </div>
        </Layout>
    );
}
