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
                'custom-blue': '#2C3E77',
                'custom-lightblue': '#5B73C2',
                'custom-melon': '#DAA49A',
                'custom-beige': '#EDF5E1',
            },
        },
    },
    plugins: [],
}
