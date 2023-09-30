/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                rubik: ['Rubik', 'sans-serif']
            }
        },
        screens: {
            mobile: '320px',
            hd: '1360px',
            fullhd: '1560px'
        }
    },
    plugins: []
};
