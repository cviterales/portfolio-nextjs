# Repository Guidelines

## Cómo usar esta guía

Portfolio-nextjs es un frontend. Este archivo es el índice: dice dónde vive cada cosa y qué skill usar. Las reglas viven en otro lado y no se repiten acá.

| Capa                        | Responde                                                                            | Ubicación                                                   |
| --------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Steering**                | Cómo ES este proyecto: mapas, dominio, invariantes, convenciones propias            | `.kiro/steering/`                                           |
| **Skills**                  | Cómo se HACE un tipo de tarea: TDD, tests, commit, changelog, patrones de framework | `.kiro/skills/<nombre>/SKILL.md`                            |
| **Agents**                  | Quién coordina el trabajo                                                           | `.kiro/agents/`                                             |


## Leer antes de trabajar

Steering (en `.kiro/steering/`):

- `frontend-conventions` — convenciones del proyecto: componentes, tokens, stores, services.
- `react-best-practices` — reglas de React del proyecto.
- `testing-workflow` — cómo ejecutar tests unitarios y datos de prueba.
- `typescript-best-practices` — reglas de tipado del proyecto.

### Precedencia

**Steering del proyecto > skill > conocimiento general.** Si una skill contradice un steering, se aplica el steering y se avisa para corregir la skill.

### Flujo de trabajo

- **Features no triviales, Bugfixes y cambios chicos** (una sola capa, sin schema ni contrato nuevo): se hacen directamente aplicando las skills de la tabla de abajo.
- Reglas transversales de código y seguridad: steering `development-standards` (siempre cargado). Quién corre build y tests y cómo se ejecutan: steering `testing-workflow`.

---

## Skills

Activar la skill indicada **antes** de empezar la tarea correspondiente.

| Skill          | Cuándo usarla                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `typescript`   | Escribir tipos o interfaces                                                                    |
| `changelog`    | Registrar un cambio en `changelog.d/` o revisar el formato                                     |
| `commit`       | Crear un commit                                                                                |
| `pull-request` | Antes de marcar un PR como listo                                                               |
| `react-19`     | Escribir componentes React                                                                     |
| `nextjs-16`    | App Router, Server Actions, rutas, caché                                                       |
| `frontend`     | Estructura de UI, design system, reuso de componentes                                          |
| `rtl`          | Tests unitarios de componentes, hooks o utilidades                                             |

---

## Project Overview

portfolio-nextjs is an portfolio page.

| Component                | Location                        | Tech Stack                                                       |
| ------------------------ | ------------------------------- | ---------------------------------------------------------------- |
| Frontend                 | `./`  | Next 16 + React 19 + css modules + rtl

---

## Commit & Pull Request Guidelines

Formato: `<type>(<scope>): <description>` (skill `commit`).

- **Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `style`, `test`.
- **Scopes:** `frontend`, `backend`, `db`, `map-gen`.
- Los commits los decide el usuario; el agente propone el mensaje, no ejecuta `git commit`/`push`.
- Cada capa tiene `changelog.d/` para los fragmentos de changelog (skill `changelog`).

Antes de un PR: ejecutar los tests y linters de la capa afectada (skill `pull-request`).
