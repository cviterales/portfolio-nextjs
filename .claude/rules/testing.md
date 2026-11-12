---
paths:
  - "**/*.spec.{ts,tsx}"
  - "jest.config.*"
---

# Pruebas

- Aún no hay Jest instalado. Si una tarea lo requiere, proponer agregar `jest` + `@testing-library/react` + `@testing-library/user-event` antes de instalar.
- Spec junto al componente: `<Nombre>.spec.tsx`. Patrones en la skill `rtl`.
- Correr solo el scope: `pnpm exec jest <nombre> --silent --bail`. Nunca la suite completa ni `--watch`.
- Fallos fuera del scope: mencionarlos en una línea, no arreglarlos.
