/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '*',
        destination: '*',
      },
    ]
  },
};

module.exports = nextConfig;