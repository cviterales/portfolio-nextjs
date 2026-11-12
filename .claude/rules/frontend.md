---
paths:
  - "src/**/*.{ts,tsx,css}"
---

# Frontend

**Componentes**
- `src/components/{atoms,molecules,organisms}/<Nombre>/<Nombre>.tsx` + `<Nombre>.module.css`. Atom = elemento simple; molecule = 2-3 atoms; organism = sección.
- PascalCase, sin `index.ts` barrel, `export default function`, props con `type` local y desestructuradas.
- Server Component por defecto; `'use client'` solo con hooks, eventos o APIs del navegador.
- Imports con `@/`: libs → CSS Module → hooks/constant/utils/types → componentes.
- Reusar antes de crear: buscar en `components/`, `hooks/`, `constant/`, `utils/`, `types/`. Usado en 2+ lugares → carpeta compartida; en 1 → local.
- Textos y datos de secciones viven en `src/constant/`, sus tipos en `src/types/`.

**React**
- Sin `useMemo`/`useCallback`/`React.memo` (React Compiler). Sin `import React`.
- No espejar props en `useState`+`useEffect`: derivar el valor.
- `ref` como prop, sin `forwardRef`. Keys estables en listas.

**Estilos**
- Nunca hex en `.module.css` ni en TSX: solo `var(--token)`.
- Colores: fuente única `src/styles/palette.mjs` → `pnpm tokens` genera `src/components/template/colors.css` y `diagram.css` (no editarlos a mano). Para SVG animados con motion, importar colores desde `palette.mjs`.
- Clases camelCase por propósito (`.insufficient`, no `.redBorder`). Spacing: gap 4/10/12/16, padding 10-14/20, radius 4/8/12 px.

**TypeScript**
- Sin `any` (usar `unknown` + guards). Tipo de retorno explícito en funciones no-componente.
- Conjuntos cerrados: objeto `as const` + tipo derivado. `interface` para objetos, `type` para props.
- `const` sobre `let`; constantes en UPPER_SNAKE_CASE.
