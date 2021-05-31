import { useState, useMemo } from "react"

const useSortableData = (items, config = null) => {
    const [sortField, setSortField] = useState(config)

    const sortedItems = useMemo(() => {
        let sortableItems = [...items]

        if (sortField !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortField.key] < b[sortField.key]) {
                    return sortField.direction === "ascending" ? -1 : 1
                } else if (a[sortField.key] > b[sortField.key]) {
                    return sortField.direction === "ascending" ? 1 : -1
                }
                return 0
            })
        }
        return sortableItems
    }, [items, sortField])

    const requestSort = key => {
        let direction = "ascending"

        if (sortField && sortField.key === key && sortField.direction === "ascending") {
            direction = "decending"
        }
        setSortField({ key, direction })
    }
    return { items: sortedItems, requestSort }
}

export default useSortableData