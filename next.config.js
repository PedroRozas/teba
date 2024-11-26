/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jumbo.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'comercialteba.cl',
      }
    ]
  },
  output: 'export',
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    // Add worker-loader for PDF.js worker
    config.module.rules.push({
      test: /pdf\.worker\.mjs$/,
      type: 'asset/resource'
    });
    
    return config;
  },
};

module.exports = nextConfig;