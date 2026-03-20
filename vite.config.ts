import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const reactPlugins = react();
  const plugins: PluginOption[] = Array.isArray(reactPlugins)
    ? [...reactPlugins]
    : [reactPlugins];

  if (mode === "development") {
    try {
      const { componentTagger } = await import("lovable-tagger");
      const taggerPlugin = componentTagger();
      plugins.push(...(Array.isArray(taggerPlugin) ? taggerPlugin : [taggerPlugin]));
    } catch {
      // Skip the dev-only plugin when its optional peer dependencies
      // are unavailable in the preview environment.
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
