/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ],
    },
    sassOptions: {
        silenceDeprecations: ["legacy-js-api"],
    },
    turbopack: {
        root: ".",
    },
};

export default nextConfig;
