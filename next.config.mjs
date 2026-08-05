/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  // Hide the `x-powered-by: Next.js` header (info disclosure hardening)
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // clickjacking protection — never allow framing this app
          { key: "X-Frame-Options", value: "DENY" },
          // keep browsers from MIME-sniffing responses away from declared types
          { key: "X-Content-Type-Options", value: "nosniff" },
          // only send the origin (not the full URL) on cross-origin requests
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // deny browser features this app never uses
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
