/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'pixieset.com'],
  },
  env: {
    ACCESS_KEY: process.env.ACCESS_KEY,
  },
  
}

module.exports = nextConfig