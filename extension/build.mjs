import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const extensionRoot = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(extensionRoot, "dist");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

await esbuild.build({
  entryPoints: [path.join(extensionRoot, "src/popup.ts")],
  outfile: path.join(distDir, "popup.js"),
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2022",
  sourcemap: true,
  logLevel: "info",
});

const staticFiles = ["popup.html", "popup.css", "manifest.json"];

await Promise.all(
  staticFiles.map((fileName) =>
    cp(path.join(extensionRoot, fileName), path.join(distDir, fileName)),
  ),
);

console.log("Built extension/dist");
