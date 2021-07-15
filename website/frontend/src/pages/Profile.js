import React from "react"
import Card from "../components/Card"
import Layout from "../components/Layout"
import { GiMoneyStack } from "react-icons/gi"
import { IoMdCube } from "react-icons/io"
import { FaCoins } from "react-icons/fa"
import { FaDungeon } from "react-icons/fa"
import { GiSwordsPower } from "react-icons/gi"
import Statistics from "../components/profile/Statistics"

export default function Profile() {
    return (
        <Layout>
            <div className="flex-col w-full h-full overflow-y-auto gap-y-3">
                <Statistics />

                <Card height="auto" width="full" title="Items" icon={<IoMdCube />}>

                </Card>

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
