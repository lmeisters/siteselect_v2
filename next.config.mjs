/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "awwwards.com",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
