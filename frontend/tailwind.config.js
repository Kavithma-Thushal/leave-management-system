/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                'darkBlue': '#000a1f',
                'neonBlue': '#00c7ff',
                'neonRed': '#f1123e',
            },
            textColor: {
                'darkBlue': '#000a1f',
                'neonBlue': '#00c7ff',
                'neonRed': '#ff006a',
            },
            borderColor: {
                'darkBlue': '#000a1f',
                'neonBlue': '#00c7ff',
                'neonRed': '#ff006a',
            },
        },
    },
    plugins: [],
}