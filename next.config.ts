import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // Amazon domains
      {
        protocol: "https",
        hostname: "**.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      // Common image CDNs and hosts
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.kinja-img.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.media-imdb.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.imdb.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.wikia.nocookie.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
