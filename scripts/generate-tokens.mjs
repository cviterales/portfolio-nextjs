// @ts-check
/**
 * Genera los archivos de tokens CSS desde la paleta única en
 * `src/styles/palette.mjs`. Ejecutar con `npm run tokens`.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { PRIMITIVES, SEMANTIC } from "../src/styles/palette.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const TOKENS_DIR = resolve(HERE, "../src/styles/tokens");
const BANNER =
  "/* Generado por scripts/generate-tokens.mjs desde src/styles/palette.mjs. No editar a mano. */";

function semanticValue(token) {
  return "ref" in token ? `var(--color-${token.ref})` : token.raw;
}

function colorsCss() {
  const primitives = Object.entries(PRIMITIVES)
    .map(([name, hex]) => `  --color-${name}: ${hex};`)
    .join("\n");

  const semantic = Object.entries(SEMANTIC)
    .filter(([name]) => !name.startsWith("diagram-"))
    .map(([name, token]) => `  --${name}: ${semanticValue(token)};`)
    .join("\n");

  return `${BANNER}\n:root {\n  /* Primitivos */\n${primitives}\n\n  /* Semánticos */\n${semantic}\n}\n`;
}

function diagramCss() {
  const vars = Object.entries(SEMANTIC)
    .filter(([name]) => name.startsWith("diagram-"))
    .map(([name, token]) => `  --${name}: ${semanticValue(token)};`)
    .join("\n");

  return `${BANNER}\n:root {\n${vars}\n}\n`;
}

await writeFile(resolve(TOKENS_DIR, "colors.css"), colorsCss(), "utf8");
await writeFile(resolve(TOKENS_DIR, "diagram.css"), diagramCss(), "utf8");

console.log("Tokens CSS generados en src/styles/tokens/");
