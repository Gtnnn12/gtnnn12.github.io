// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// ---------------------------------------------------------------------------
// Static export for GitHub Pages
// ---------------------------------------------------------------------------
// The Lovable sandbox always builds for Cloudflare (the nitro preset is forced
// there), so this static config is a no-op in the sandbox and only takes
// effect when you build locally or in CI with STATIC_EXPORT=true.
//
// GitHub Pages project sites are served from https://<user>.github.io/<repo>/,
// so every asset URL must be prefixed with /<repo>/. Set GHP_BASE to that
// prefix (e.g. "/my-repo/") when building. Defaults to "/" for user/org pages
// or a custom domain.
// ---------------------------------------------------------------------------
const staticExport = process.env["STATIC_EXPORT"] === "true";
const base = process.env["GHP_BASE"] ?? "/";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    base,
  },
  ...(staticExport
    ? {
        // `prerender` is a valid nitro option at runtime but not part of the
        // narrow type exposed by @lovable.dev/vite-tanstack-config, hence the cast.
        nitro: {
          preset: "static",
          output: { dir: "dist" },
          prerender: { crawlLinks: true, routes: ["/"] },
        } as never,
      }
    : {}),
});
