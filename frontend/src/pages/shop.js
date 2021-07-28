import React, { useState } from "react"
import Layout from "../components/layout"
import { useShop } from "../hooks/useShop"
import _ from "lodash"
import { useProfile } from "../hooks/useProfile"
import { useEntity } from "../hooks/useEntity"
import { useRelationship } from "../hooks/useRelationship"
import { useAuth } from "../hooks/useAuth"
import EntityShop from "../components/shop/entityShop"


function Shop() {
    const { session } = useAuth()
    const { accessToken, user: { username } } = session
    const { data: relationshipData, loading: relationshipLoading } = useRelationship(username, accessToken)
    const { data: profileData, loading: profileLoading, mutate: profileMutate } = useProfile(username, accessToken)
    const { data: entityData, loading: entityLoading, mutate: entityMutate } = useEntity(username, accessToken)
    const { data: shopData } = useShop(accessToken)
    const [currentIndex, setCurrentIndex] = useState(0)

    if (relationshipLoading || profileLoading || entityLoading) {
        return <div className="flex items-center justify-center">Loading...</div>
    }

    const getFocusDesign = (index) => {
        if (index === currentIndex) {
            return "text-white cursor-default"
        }
        return "text-custom-misc-inactive cursor-pointer"
    }

    return (
        <Layout
            profileData={profileData} profileMutate={profileMutate}
            relationshipData={relationshipData}
            accessToken={accessToken}
        >
            {/* Tabs */}
            <div className="relative flex flex-col w-full h-full overflow-y-auto scrollbar-hide">
                <p className="text-white font-semibold m-5 space-x-12">
                    <span className={getFocusDesign(0)} onClick={() => setCurrentIndex(0)}>Entities</span>
                    <span className={getFocusDesign(1)} onClick={() => setCurrentIndex(1)}>Items</span>
                </p>

                {/* Shop */}
                {
                    currentIndex === 0
                        ? <EntityShop
                            shopData={shopData}
                            profileData={profileData}
                            profileMutate={profileMutate}
                            entityData={entityData}
                            entityMutate={entityMutate}
                            accessToken={accessToken}
                        />
                        : null      // ADD ITEM SHOP
                }

            </div>
        </Layout>
    )
}

export default Shop