import { useEffect } from "react";

/**
 * Basic content-protection measures to discourage casual copying and
 * developer-tools access. NOTE: these are deterrents only — they can all
 * be bypassed by a determined user and are not a substitute for real
 * access control. Kept client-only and SSR-safe.
 */
export function useContentProtection() {
  useEffect(() => {
    // 1. Disable the context menu (right-click) across the whole page.
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Block common DevTools / copy / save keyboard shortcuts.
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // F12 — open DevTools
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const opt = e.altKey;

      // Ctrl+Shift+I / Cmd+Opt+I — DevTools
      // Ctrl+Shift+J / Cmd+Opt+J — Console
      // Ctrl+Shift+C / Cmd+Opt+C — Inspect element
      if (ctrl && shift && (key === "i" || key === "j" || key === "c")) {
        e.preventDefault();
        return;
      }
      if (ctrl && opt && (key === "i" || key === "j" || key === "c")) {
        e.preventDefault();
        return;
      }

      // Ctrl+U / Cmd+Opt+U — View source
      if (ctrl && key === "u") {
        e.preventDefault();
        return;
      }
      if (ctrl && opt && key === "u") {
        e.preventDefault();
        return;
      }

      // Ctrl+S / Cmd+S — Save page
      if (ctrl && key === "s") {
        e.preventDefault();
        return;
      }

      // Ctrl+C / Cmd+C — Block copying text (optional deterrent)
      if (ctrl && key === "c" && !shift) {
        e.preventDefault();
        return;
      }
    };

    // 3. Prevent dragging of images.
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);
}
