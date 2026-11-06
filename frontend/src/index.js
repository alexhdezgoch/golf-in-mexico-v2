import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";

const rootEl = document.getElementById("root");

const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// When the route was prerendered at build time (scripts/prerender.mjs), #root
// already has real DOM. Hydrate it instead of createRoot().render() so React 19
// adopts the prerendered markup rather than wiping it (which would flash the
// page blank on load). We flag this so App renders its first paint to MATCH the
// captured DOM (no intro overlay, no opacity:0 entry variant) and hydration is
// clean. Empty #root (SPA fallback / dev) takes the normal client-render path.
if (rootEl.hasChildNodes()) {
  window.__WAS_PRERENDERED__ = true;
  // ?hydrate-debug prints where a hydration mismatch happens (component stack), for checking prerendered pages.
  const debug = /[?&]hydrate-debug\b/.test(window.location.search);
  hydrateRoot(rootEl, tree, debug ? { onRecoverableError: (error, info) => console.warn("[hydrate-debug]", error?.message, info?.componentStack) } : undefined);
} else {
  createRoot(rootEl).render(tree);
}
