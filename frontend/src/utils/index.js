export const clampQuantity = (amount) => {
    if (amount >= 99999) {
        return 99999
    }
    return amount
}

// Bypass dynamic string concatenation class names
// https://tailwindcss.com/docs/just-in-time-mode

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