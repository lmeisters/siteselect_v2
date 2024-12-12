/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
            maxWidth: {
                "8xl": "105rem",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                gray: {
                    100: "#f3f4f6",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            keyframes: {
                "arrow-move": {
                    "0%": {
                        transform: "translate(0, 0)",
                    },
                    "49%": {
                        transform: "translate(16px, -16px)",
                    },
                    "50%": {
                        transform: "translate(-16px, 16px)",
                    },
                    "100%": {
                        transform: "translate(0, 0)",
                    },
                },
                shimmer: {
                    "0%": {
                        backgroundPosition: "200% 0",
                        opacity: "0.5",
                    },
                    "50%": {
                        opacity: "0.8",
                    },
                    "100%": {
                        backgroundPosition: "-200% 0",
                        opacity: "0.5",
                    },
                },
            },
            animation: {
                "arrow-move": "arrow-move 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
                shimmer: "shimmer 2s linear infinite",
                "shimmer-dark": "shimmer 2s linear infinite",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
