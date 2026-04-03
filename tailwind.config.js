/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#6366f1', // Indigo
                    DEFAULT: '#4f46e5',
                    dark: '#3730a3',
                },
                secondary: {
                    light: '#a855f7', // Purple
                    DEFAULT: '#9333ea',
                    dark: '#7e22ce',
                },
                accent: {
                    light: '#06b6d4', // Cyan/Neon Blue
                    DEFAULT: '#0891b2',
                    dark: '#0e7490',
                },
                background: '#0f172a', // Slate 900
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                'main-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
            },
            boxShadow: {
                'neon-lg': '0 0 30px rgba(0, 242, 255, 0.1)'
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
