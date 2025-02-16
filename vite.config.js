import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssCustomMedia from "postcss-custom-media";
import postcssPresetEnv from "postcss-preset-env";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcssCustomMedia(), postcssPresetEnv({ stage: 1 })],
    },
  },
});
