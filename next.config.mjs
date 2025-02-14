/** @type {import('next').NextConfig} */
const prefix =
  process.env.NODE_ENV === "production" ? "https://amazon7737.github.io/todolist/" : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
};

export default nextConfig;
