/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{ignoreBuildErrors: true},
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol:'https',
        hostname:'lh3.googleusercontent.com',
        port:'',
        pathname:'/**'
      },
      {
        protocol:'https',
        hostname:'flagcdn.com',
        port:'',
        pathname:'/**'
      }
    ],
  },
};

export default nextConfig;
