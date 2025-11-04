import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['flutterwave-node-v3', 'winston'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-side packages from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        'winston': false,
        'flutterwave-node-v3': false,
      };
    }
    return config;
  },
  turbopack: {
    // Turbopack configuration
  },
};

export default nextConfig;
