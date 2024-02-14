import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import TsconfigPaths from "vite-tsconfig-paths";
import React from "@vitejs/plugin-react-swc";

export default defineConfig({
  build: {
    outDir: "build/client",
  },
  plugins: [
    React(),
    TsconfigPaths(),
    TanStackRouterVite({
      routesDirectory: "app/routes",
      generatedRouteTree: "app/routeTree.gen.tsx",
    }),
  ],
});
