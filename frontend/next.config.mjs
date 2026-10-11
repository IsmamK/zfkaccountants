/** @type {import('next').NextConfig} */

// CMS uploads are served from the backend's /media/ path.
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");

const nextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", ""),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
