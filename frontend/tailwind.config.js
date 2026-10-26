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
                cream: '#eef0e6',
                ink: '#13221a',
                gold: '#c8a96e',
                forest: '#0d2018',
                muted: '#56635a',

                /* New design-system tokens */
                'green-deep':  '#0d2018',
                'green-mid':   '#1f5c3a',
                'green-light': '#2d6a4f',
                'gold-light':  '#dfc193',
                'off-white':   '#eef0e6',
                surface:       '#e4e8dc',
                'border-warm': '#cdd4c3',
                stone:         '#b9c1ae',
                'text-warm':   '#13221a',
                'text-mid':    '#3f4c43',
                'text-muted':  '#56635a',
                'text-faint':  '#9aa494',
                live:          '#1f5c3a',

                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                border: 'hsl(var(--border))',
                ring: 'hsl(var(--ring))',
            },
            fontFamily: {
                display: ['"Inter"', 'system-ui', 'sans-serif'],
                body: ['"Inter"', 'system-ui', 'sans-serif'],
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
