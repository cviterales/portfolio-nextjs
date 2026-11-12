# Reglas generales

- Stack: Next.js 16 (App Router), React 19 + React Compiler, TypeScript estricto, CSS Modules, `motion`, pnpm. Sin Tailwind, Sass, CSS-in-JS ni librerías de UI.
- Editar archivos existentes; nunca duplicados `_fixed`/`_backup` ni temporales en git.
- Dependencia nueva: solo con justificación clara; preferir lo nativo o ya instalado.
- Git: no commitear ni pushear; proponer mensaje `<type>(frontend): <desc>` (feat, fix, docs, chore, perf, refactor, style, test). Nada destructivo sin permiso.
- `pnpm build`/`tsc` lo corre el usuario; pedirlo y esperar la salida.
- Seguridad: revisar como sénior (XSS, secretos en código, datos sin validar). Reportar hallazgos en una línea: severidad, `archivo:línea`, riesgo, fix.
- Respuestas breves: resultado, archivos tocados, pendientes. Sin re-narrar diffs. Lecturas independientes en paralelo; no releer archivos sin cambios.
