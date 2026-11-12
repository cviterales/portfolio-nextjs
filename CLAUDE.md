# Portfolio

Portfolio personal. Solo frontend: Next.js 16 (App Router) + React 19 + TypeScript + CSS Modules + `motion`, pnpm.

## Dónde está cada cosa

- Reglas: `.claude/rules/` (`core` siempre; `frontend` y `testing` se cargan por ruta).
- Skills (`.claude/skills/`): `frontend` (componentes), `nextjs-16` (APIs de Next), `react-19` (hooks/async), `rtl` (tests).
- Código: `src/app`, `src/components/{atoms,molecules,organisms,template}`, `src/constant` (contenido), `src/types`, `src/hooks`, `src/utils`, `src/styles/palette.mjs` (colores).

## Comandos

- `pnpm dev` · `pnpm lint` · `pnpm tokens` (regenera los tokens CSS desde `palette.mjs`).
- `pnpm build` lo corre el usuario.

## Precedencia

Rules > skills > conocimiento general. Si una skill contradice un rule, aplicar el rule y avisar.
