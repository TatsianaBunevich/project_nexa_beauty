/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  env: {
    ADMIN_KEY: process.env.ADMIN_KEY,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    // Use path.resolve(__dirname, 'src') if your files are inside a src folder
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co', // This allows all Supabase projects
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
