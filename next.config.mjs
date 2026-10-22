import { readdirSync } from "node:fs";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// Solo con `npm run dev`: elenco dei file in themes/ per il selettore di
// anteprima (components/ThemePreview.jsx). Nel build per il sito online la
// variabile non esiste e il selettore non viene incluso.
export default function config(phase) {
  if (phase !== PHASE_DEVELOPMENT_SERVER) return nextConfig;

  const themes = readdirSync(new URL("./themes", import.meta.url))
    .filter((file) => file.endsWith(".js"))
    .map((file) => file.replace(/\.js$/, ""));

  return { ...nextConfig, env: { THEME_PREVIEW_LIST: themes.join(",") } };
}
