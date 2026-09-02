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
// STATIC_EXPORT=true (set by `bun run build:static`) turns the TanStack Start
// build into a pure static export:
//
//   - nitro is disabled. Running it alongside TanStack Start's own export
//     conflicts: both want to own `dist/server`, and TanStack's perfect-prerender
//     preview server can't import `dist/server/server.js` because nitro replaces
//     it with `dist/server/index.mjs`. Disabling nitro lets TanStack Start emit
//     its own server bundle (`dist/server/server.js`) so prerendering can run.
//   - The three routes are prerendered to real HTML files in `dist/client`
//     (`index.html`, `plugins/index.html`, `vertex/index.html`) so every page
//     works for direct navigation on GitHub Pages with no server involved.
//
// GitHub Pages user sites (https://<user>.github.io/) are served from the root,
// so the base is "/" by default. Set GHP_BASE (e.g. "/my-repo/") for a project
// site or custom domain.
//
// Outside STATIC_EXPORT the config keeps the standard Lovable build (nitro →
// cloudflare-module) untouched.
// ---------------------------------------------------------------------------
const staticExport = process.env["STATIC_EXPORT"] === "true";
const base = process.env["GHP_BASE"] ?? "/";

export default defineConfig({
  ...(staticExport ? { nitro: false } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    ...(staticExport
      ? {
          prerender: {
            enabled: true,
            crawlLinks: false,
            failOnError: true,
          },
          pages: [{ path: "/" }, { path: "/plugins" }, { path: "/vertex" }],
        }
      : {}),
  },
  vite: {
    base,
  },
});
