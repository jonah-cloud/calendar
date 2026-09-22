/**
 * Inlines the Vite build into ONE self-contained index.html, which is what the
 * Claude artifact preview needs (no separate asset requests).
 *   npx vite build && node scripts/bundle-artifact.mjs
 * → dist/spark-academy.html
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const assets = readdirSync(join(dist, "assets"));
const js = assets.find((f) => f.endsWith(".js"));
const css = assets.find((f) => f.endsWith(".css"));

const jsSrc = readFileSync(join(dist, "assets", js), "utf8");
const cssSrc = readFileSync(join(dist, "assets", css), "utf8");

// a literal </script> inside the bundle would close our inline tag early
const safeJs = jsSrc.replace(/<\/script>/gi, "<\\/script>");

let html = readFileSync(join(dist, "index.html"), "utf8");
html = html
  .replace(/<script type="module"[^>]*><\/script>/, "")
  .replace(/<link rel="stylesheet"[^>]*>/, `<style>\n${cssSrc}\n</style>`)
  .replace("</body>", `<script type="module">\n${safeJs}\n</script>\n</body>`);

const out = join(dist, "spark-academy.html");
writeFileSync(out, html);
console.log(`${out} — ${(html.length / 1024 / 1024).toFixed(2)} MB`);
