import nextConfig from "eslint-config-next";

export default [
  {
    ignores: [
      ".next/**",
      "dist-test/**",
      "studio-portfolio/**",
      "node_modules/**",
      "public/**",
    ],
  },
  ...nextConfig,
];
