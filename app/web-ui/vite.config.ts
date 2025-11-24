import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const isDev = process.env.NODE_ENV === "development";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: isDev ? "./webapp" : "../src-tauri/resources/webapp",
    emptyOutDir: true,
  },
});
