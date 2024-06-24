/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:5001', '*.localhost:5001'],
    },
  },
};

export default nextConfig;
