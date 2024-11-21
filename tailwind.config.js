/** @type {import('tailwindcss').Config} */
module.exports = {
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
                "8xl": "105rem", // 1408px
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                gray: {
                    100: "#f3f4f6", // You can adjust this value to match your design
                },
            },
            keyframes: {
                "arrow-exit": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "49%": { transform: "translate(100%, -100%)" },
                    "51%": { transform: "translate(-100%, 100%)" },
                },
            },
            animation: {
                "arrow-exit": "arrow-exit 0.5s ease-in-out",
            },
        },
    },
    plugins: [],
};
