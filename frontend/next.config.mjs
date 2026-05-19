/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'pub-your-r2-id.r2.dev'], // Add Cloudflare R2 public URL
  },
};

export default nextConfig;
