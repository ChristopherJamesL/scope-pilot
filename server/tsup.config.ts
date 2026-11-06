import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: "esm",
  platform: "node",
  target: "node24",
  outDir: "dist",
  sourcemap: true,
  clean: true,
  // Packages listed in dependencies stay external (installed in production) by default.
  // @scopepilot/shared is TypeScript source, so it must be bundled into the output instead.
  noExternal: ["@scopepilot/shared"],
});
