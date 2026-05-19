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
                /* Legacy aliases — preserved so existing JSX keeps working */
                cream: '#f8f6f1',
                ink: '#1a1714',
                gold: '#c8a96e',
                forest: '#0f2419',
                muted: '#8a847c',

                /* New design-system tokens */
                'green-deep':  '#0f2419',
                'green-mid':   '#1a3c2e',
                'green-light': '#2d6a4f',
                'gold-light':  '#dfc193',
                'off-white':   '#f8f6f1',
                surface:       '#f0ece4',
                'border-warm': '#e2ddd5',
                stone:         '#c9c3b8',
                'text-warm':   '#1a1714',
                'text-mid':    '#4a4540',
                'text-muted':  '#8a847c',
                'text-faint':  '#b8b3ac',
                live:          '#1f5c3a',

                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                border: 'hsl(var(--border))',
                ring: 'hsl(var(--ring))',
            },
            fontFamily: {
                display: ['"Libre Baskerville"', 'Georgia', 'serif'],
                body: ['"Outfit"', 'sans-serif'],
                mono: ['"Space Mono"', 'monospace'],
            },
            letterSpacing: {
                'editorial': '0.2em',
                'wide-editorial': '0.32em',
                'label': '0.12em',
                'wide': '0.06em',
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
                },
                'scroll-pulse': {
                    '0%, 100%': { transform: 'scaleY(1)', opacity: '0.6' },
                    '50%':       { transform: 'scaleY(0.6)', opacity: '1' }
                }
            },
            animation: {
                'fade-up': 'fade-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
                'slow-zoom': 'slow-zoom 18s ease-out both',
                'scroll-pulse': 'scroll-pulse 2.5s cubic-bezier(0.45, 0, 0.55, 1) infinite'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
