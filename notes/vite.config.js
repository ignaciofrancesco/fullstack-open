import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Config to redirect calls from the localhost of the frontend to the localhost of the backend.
  // Because in dev mode, my front and back are in separate projects, running on separate servers.
  // So this is a way to mask that situation, to make the calls work, since the front was configured
  // to use relative paths.
  // Consider that the front uses the vite built-in server to be served as static files,
  // while the backend app is a server itself.
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
