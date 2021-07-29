export const clampQuantity = (amount) => {
    if (amount >= 99999) {
        return 99999
    }
    return amount
}

export const isContainFraction = (text) => {
    return text.includes("/")
}

export const convertFractionToPercentage = (text) => {
    const textSplit = text.split("/")
    const length = Math.ceil((parseInt(textSplit[0]) / parseInt(textSplit[1]) * 100))
    return length + "%"
}

export const getFocusDesign = (index, currentIndex) => {
    if (index === currentIndex) {
        return "text-white cursor-default"
    }
    return "text-custom-misc-inactive cursor-pointer"
}