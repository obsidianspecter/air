/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Proxy to Flask server
      },
      {
        source: "/ws",
        destination: "http://your-esp8266-ip-address:81",
      },
    ]
  },
}

module.exports = nextConfig

