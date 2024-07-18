// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom-green': '#379392',
                'custom-gray': '#E0E0E0',
                'custom-blue': '#3C4E88',
                'custom-lightblue': '#5B73C2',
                'custom-melon': '#507255',
                'custom-beige': '#EDF5E1',
                'custom-brown': '#413620',
                'custom-lightgray': '#e4edea',

                //for home page
                'custom-1': '#5ea0b7',
                'custom-2': '#477a8f',
            },
        },
    },
    plugins: [],
}
