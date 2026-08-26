import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Enable Partial Prerendering for faster initial page loads
  cacheComponents: true,
  // Contentful transforms all images via the custom loader, so Next's sharp
  // (and its libvips binaries) never run at runtime — keep them out of the
  // serverless function bundle
  outputFileTracingExcludes: {
    "*": ["node_modules/sharp/**", "node_modules/@img/**"],
  },
  images: {
    loader: "custom",
    loaderFile: "./utils/contentfulLoader.ts",
    // Layout caps at 1216px content width; 2432 covers the widest slot at 2x DPR
    deviceSizes: [640, 780, 1080, 1216, 1606, 1920, 2432],
  },
  async redirects() {
    return [
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/",
        permanent: false,
      },
    ];
  },
  // Add CSP and security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://images.ctfassets.net",
              "media-src 'self' https://videos.ctfassets.net https://assets.ctfassets.net",
              "font-src 'self' data:",
              "connect-src 'self' https://graphql.contentful.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default config;
