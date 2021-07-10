import React from "react"
import Card from "../Card"
import { FiActivity } from "react-icons/fi"

function Activity() {
    return (
        <Card height="full" width="full" title="Activity" icon={<FiActivity />}>
            <p>testing</p>
        </Card>
    )
}

export default Activity