/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mpyfqtnbrfsbpvdovikp.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
