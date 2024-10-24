/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'farmapp-1.onrender.com',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  