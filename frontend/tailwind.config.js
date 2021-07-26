module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    mode: "jit",
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
                        grey: "#707070",
                        lightgrey: "#D2D2D2",
                        darkblue: "#041A2F",
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
                    card: {
                        normal: "#28282B",
                        light: "rgba(101, 101, 101, 0.1)",
                        dark: "#202020"
                    },
                    misc: {
                        datetime: "#FFF2C7",
                        object: "#A5CFFF",
                        status: "#EC4069",
                        online: "#77E4BD",
                        offline: "#757575",
                        accent: "#8955DF",
                        nav: "#693EBD",
                        inactive: "#8F99A5"
                    },
                }
            },
            boxShadow: {
                hp: "-1px 0 5px 1px rgba(241, 94, 108, 0.5)",
                xp: "-1px 0 5px 1px rgba(255, 195, 93, 0.5)",
                progress:"1px 0 5px 1px rgba(85, 85, 85, 0.5)",
                button: "0 0 5px 1px rgba(255, 72, 135, 0.5)",
                white: "0 0 5px rgba(255, 255, 255, 0.5)",
                "white-lg": "0 0 10px 1px rgba(255, 255, 255, 0.5)"
            },
            // gridTemplateColumns: {
            //     "auto": "repeat(auto-fit, 175px)"
            // },
        },
    },
    variants: {
        scrollbar: ["rounded"],
        extend: {
            opacity: ["disabled"]
            
        },
    },
    plugins: [
        require("tailwind-scrollbar"),
        require("tailwind-scrollbar-hide"),
    ],
}
