/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_LOCAL_CLIENT_URL: process.env.REACT_APP_LOCAL_CLIENT_URL,
    REACT_APP_LOCAL_SERVER_URL: process.env.REACT_APP_LOCAL_SERVER_URL,
  },
};

export default nextConfig;
