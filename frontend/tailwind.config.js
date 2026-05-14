/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                cream: '#F5F2EB',
                ink: '#1A1A18',
                gold: '#C4A24E',
                forest: '#2C4A2C',
                muted: '#5C5C56',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                border: 'hsl(var(--border))',
                ring: 'hsl(var(--ring))',
            },
            fontFamily: {
                display: ['"Cormorant Garamond"', 'serif'],
                body: ['"Outfit"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            letterSpacing: {
                'editorial': '0.2em',
                'wide-editorial': '0.32em',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'slow-zoom': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.08)' }
                }
            },
            animation: {
                'fade-up': 'fade-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
                'slow-zoom': 'slow-zoom 18s ease-out both'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
