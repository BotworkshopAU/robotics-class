import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Relative base so GitHub Pages (/robotics-class/) and local preview both work.
  base: "./",
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        code: resolve(__dirname, "code.html"),
        class: resolve(__dirname, "class.html"),
        courses: resolve(__dirname, "courses.html"),
        contact: resolve(__dirname, "contact.html"),
        products: resolve(__dirname, "products.html"),
        explore: resolve(__dirname, "explore.html"),
        partners: resolve(__dirname, "partners.html"),
        classIntermediate: resolve(__dirname, "class-intermediate.html"),
        classAdvanced: resolve(__dirname, "class-advanced.html"),
        setup: resolve(__dirname, "setup.html"),
      },
    },
  },
});
