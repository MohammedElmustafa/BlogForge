import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: "https",
            hostname: "utfs.io",
            port: "",
            },
        ],
    },
};

export default nextConfig;
