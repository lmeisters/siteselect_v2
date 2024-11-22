import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata = {
    title: "SiteSelect | Curated Design Gallery for Creative Inspiration",
    description:
        "Discover a handpicked collection of innovative web design galleries. Browse expertly organized visual references to inspire your next web project and fuel your creative process.",
    keywords:
        "web design gallery, design inspiration, UI design, website showcase, creative references, web design examples, design patterns, user interface inspiration",
    authors: [{ name: "Linards M." }],
    creator: "Linards M.",
    publisher: "Linards M.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternate: {
        canonical: "https://siteselect.com",
    },
    openGraph: {
        title: "SiteSelect | Curated Design Gallery for Creative Inspiration",
        description:
            "Discover a handpicked collection of innovative web design galleries. Browse expertly organized visual references to inspire your next web project and fuel your creative process.",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>{children}</body>
        </html>
    );
}
