/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  turbopack: {},
  /**
   * Turbopack doesn't support custom webpack aliases directly
   * We'll use the paths configuration in tsconfig.json instead
   */
};

export default nextConfig;
