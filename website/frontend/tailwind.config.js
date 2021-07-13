module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or "media" or "class"
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins"]
            },
            colors: {
                custom: {
                    bg: {
                        main: "#2D2D30",
                        nav: "#171717",
                        progress: "#555555",
                    },
                    color: {
                        grey: "#707070"
                    },
                    button: {
                        primary: "#FF4887",
                    },
                    currency: {
                        primary: "#3625AF",
                        secondary: "#B363D2",
                    },
                    stats: {
                        health: "#F15E6C",
                        attack: "#FFC35D",
                        defence: "#49B79F",
                        net_worth: "#FFDFAE",
                    },
                    misc: {
                        datetime: "#FFF2C7",
                        object: "#A5CFFF",
                        status: "#EC4069",
                        online: "#77E4BD",
                        offline: "#757575",
                        accent: "#8955DF",
                        nav: "#693EBD",
                        card: "#28282B",
                        cardlight: "#202020",
                    },
                }
            },
            boxShadow: {
                glow: '5px 5px 15px 5px rgba(255, 255, 255, 0.25)'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
