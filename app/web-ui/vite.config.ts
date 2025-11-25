import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    // change the output if is running on development mode, because changes inside the 'resources' folder cause the program to restart...
    outDir: mode === "development" ? "./webapp" : "../src-tauri/resources/webapp",
    emptyOutDir: true,
  },
}));
