import React from "react"
import Card from "../components/Card"
import Layout from "../components/Layout"
import { IoStatsChart } from "react-icons/io5"
import { GiMoneyStack } from "react-icons/gi"
import { IoMdCube } from "react-icons/io"
import { FaCoins } from "react-icons/fa"
import { FaDungeon } from "react-icons/fa"
import { GiSwordsPower } from "react-icons/gi"

export default function Profile() {
    return (
        <Layout>
            <div className="flex flex-col w-full h-full overflow-y-auto gap-y-3">
                <Card height="auto" weight="full" title="Statistics" icon={<IoStatsChart />}>

                </Card>

                <Card height="auto" weight="full" title="Items" icon={<IoMdCube />}>

                </Card>

                <Card height="auto" weight="full" title="Stocks" icon={<GiMoneyStack />}>

                </Card>

                <Card height="auto" weight="full" title="Entities" icon={<FaCoins />}>

                </Card>

                <Card height="auto" weight="full" title="Dungeon" icon={<FaDungeon />}>

                </Card>

                <Card height="auto" weight="full" title="PVP" icon={<GiSwordsPower />}>

                </Card>

            </div>
        </Layout>
    );
}
