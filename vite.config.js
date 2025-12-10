import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
      assetsInclude: ['**/*.glb'],
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3019",
        changeOrigin: true,
      },
    },
  },
  preview: {
    allowedHosts: ['blck-sheep.com', 'www.blck-sheep.com', 'localhost'],
  },
};
