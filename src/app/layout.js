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
        canonical: "https://siteselect-v2.vercel.app",
    },
    openGraph: {
        title: "SiteSelect | Curated Design Gallery for Creative Inspiration",
        description:
            "Discover a handpicked collection of innovative web design galleries. Browse expertly organized visual references to inspire your next web project and fuel your creative process.",
        url: "https://siteselect-v2.vercel.app",
        siteName: "SiteSelect",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "SiteSelect - Web Design Gallery",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SiteSelect | Curated Design Gallery for Creative Inspiration",
        description:
            "Discover a handpicked collection of innovative web design galleries. Browse expertly organized visual references to inspire your next web project.",
        images: ["/og-image.jpg"],
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png" }],
        other: [
            {
                rel: "manifest",
                url: "/site.webmanifest",
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>{children}</body>
        </html>
    );
}
