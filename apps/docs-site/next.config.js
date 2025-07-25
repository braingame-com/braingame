/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@braingame/bgui",
    "@braingame/utils",
    "react-native-web",
    "@shopify/restyle"
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native$": "react-native-web",
    };
    
    // Handle .web.tsx extensions
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts", 
      ".web.jsx",
      ".web.js",
      ...config.resolve.extensions,
    ];
    
    return config;
  },
}

module.exports = nextConfig