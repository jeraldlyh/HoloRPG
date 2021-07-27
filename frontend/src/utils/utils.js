export const clampQuantity = (amount) => {
    if (amount >= 99999) {
        return 99999
    }
    return amount
}