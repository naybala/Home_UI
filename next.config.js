module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "proptechapp.sgp1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "images2024.sgp1.cdn.digitaloceanspaces.com",
      },
    ],
  },
};
