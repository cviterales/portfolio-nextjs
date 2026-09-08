# Design — Migracion a Next.js (App Router + RSC, SSG en Vercel)

## Overview

Se migra el portfolio de Pages Router a App Router en la ultima version estable de
Next.js (linea 16, con React 19), maximizando React Server Components y manteniendo la
pagina como prerenderizado estatico (SSG) servido desde Vercel. No se usa export estatico:
se conserva la optimizacion de imagenes de la plataforma.

El principio rector: **Server Component por defecto, `"use client"` solo en las hojas
interactivas**.

## Version objetivo

- `next`: ultima estable de la linea 16.x.
- `react` y `react-dom`: 19.x (requerido por Next 16).
- `framer-motion`: version actual compatible con React 19 (paquete `framer-motion`; el
  API `motion`/`useAnimation` se mantiene). Se valida en instalacion.
- `react-icons`, `react-intersection-observer`, `sass`: ultimas compatibles.
- `@next/bundle-analyzer`: alinear a la version de Next 16.

Las versiones exactas se fijan en el momento de instalar y se verifican con el build.

## Arquitectura de rutas (App Router)

```
app/
  layout.js        # Root layout: <html lang="en">, <body>, importa globals.scss, exporta metadata
  page.js          # Pagina principal (Server Component): compone Header/Home/Projects/About/Footer
  favicon.ico      # (opcional) favicon por convencion del App Router
styles/
  globals.scss     # estilos globales (movidos/confirmados aca)
data/
  projectData.js   # datos estaticos (migrado desde dummyData/)
  techs.js
components/         # se mantiene la estructura Atomic Design existente
public/             # sin cambios
```

### `app/layout.js` (Server Component)
- Reemplaza a `_app.js` + `_document.js`.
- Define `<html lang="en">` y `<body>` con `<Main>`-equivalente (los `children`).
- Importa `../styles/globals.scss`.
- Exporta `metadata`:
  - `title: "Portfolio - Cristian Viterales"`
  - `description: "Portfolio"`
  - `keywords: ["Cristian Viterales"]`
  - `themeColor` -> via `viewport`/`metadata` segun API vigente
  - `icons: { icon: "/favicon.ico" }`
- El `<meta viewport>` se expresa con `export const viewport`.

### `app/page.js` (Server Component)
- Reproduce el markup de `pages/index.js`: `wrapper` con `<header>`, `<main>`, `<footer>`.
- Compone los Organisms. No lleva `"use client"`.

## Clasificacion Server vs Client

Basado en la lectura del codigo actual:

| Componente | Tipo | Motivo |
|------------|------|--------|
| `app/layout.js` | Server | Solo estructura + metadata |
| `app/page.js` | Server | Solo composicion |
| `Organisms/Header` | Server | Solo markup + enlaces |
| `Organisms/Home` | Server | Markup; los iconos e `Img` no requieren cliente |
| `Organisms/About` | Server | Markup + map sobre datos estaticos |
| `Organisms/Footer` | Server | Markup; delega el año a un Client Component hoja |
| `Atoms/CurrentYear` (nuevo) | **Client** | Lee `new Date().getFullYear()` en el navegador |
| `Organisms/Projects` | **Client** | Usa `useInView` (IntersectionObserver) |
| `Molecules/Project` | Server | Markup; delega animacion a wrappers cliente |
| `Molecules/Technology` | Server | Envuelve `AnimatedButton` (client) e `Img` |
| `Atoms/Title` | Server | Markup |
| `Atoms/Card` | Server | Markup |
| `Atoms/Image (Img)` | Server | `next/image` sin estado |
| `Animations/List/AnimationList` | **Client** | `useAnimation` + `useEffect` + `motion` |
| `Animations/List/Item/AnimationItem` | **Client** | `motion` |
| `Animations/Button/AnimationButton` | **Client** | `motion` con `whileHover`/`whileTap` |

Regla de frontera: un Server Component puede **renderizar** Client Components e incluso
pasarles Server Components como `children`. Por eso `Project` (server) puede envolver su
contenido en `AnimatedButton` (client) sin volverse cliente, y `page.js` (server) puede
renderizar `Projects` (client).

### Componente del año actual (`Atoms/CurrentYear`)

Para que el footer muestre siempre el año actual del visitante (no el del build), se aisla
el calculo en un Client Component hoja:

```jsx
// components/Atoms/CurrentYear/CurrentYear.js
"use client";
import { useEffect, useState } from "react";

const CurrentYear = () => {
  // Valor inicial: año del build. Se corrige en el cliente tras el montaje
  // para evitar mismatch de hidratacion y reflejar el año real del visitante.
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
};

export default CurrentYear;
```

`Footer` (Server Component) lo usa asi:

```jsx
// components/Organisms/Footer/Footer.js
import styles from "./styles.module.scss";
import CurrentYear from "../../Atoms/CurrentYear/CurrentYear";

const Footer = () => (
  <footer className={styles.footer}>
    <p><CurrentYear /> - @cviterales</p>
  </footer>
);

export default Footer;
```

Notas:
- El SSR/prerender emite el año del build; tras la hidratacion el `useEffect` lo actualiza
  al año real del cliente. En la practica solo difieren en el cambio de año, y el
  `useEffect` corrige el valor sin warning porque el ajuste ocurre post-montaje.
- **Hook opcional:** si esta logica se reutilizara en otro lugar, extraerla a
  `hooks/useCurrentYear.js` (`"use client"`) que devuelva el año y sea consumido tanto por
  `CurrentYear` como por el otro consumidor. Como hoy solo lo usa el footer, el Client
  Component hoja es suficiente; el hook queda como alternativa documentada.
- El resto del footer y de la pagina siguen siendo estaticos; solo este nodo corre en
  cliente.

### Caso `Projects`
`Projects` usa `useInView` (hook de cliente), por lo que **es** Client Component. Para no
arrastrar todo al cliente innecesariamente:
- Opcion adoptada (simple, preserva comportamiento): marcar `Projects` como
  `"use client"`. El markup interno de cada `Project` sigue siendo un Server Component
  pasado como `children` a los wrappers de animacion.
- El mapeo de `projectData` se mantiene dentro de `Projects`; los datos son estaticos e
  importados, disponibles tanto en server como en client.

## Metadata / Head

- Se elimina `next/head` de `index.js` y el `_document.js`.
- `title`, `description`, `keywords`, `icons` -> `export const metadata` en `layout.js`.
- `viewport` y `themeColor` -> `export const viewport` en `layout.js` (API vigente de Next).

## Configuracion (`next.config.js`)

- Mantener `@next/bundle-analyzer`.
- Quitar `swcMinify` (ya es default y removido en versiones recientes).
- Revisar `images.deviceSizes: [1920]`: conservarlo o ajustarlo; NO agregar `unoptimized`.
- NO agregar `output: 'export'`.

## Datos

- Mover `dummyData/projectData.js` y `dummyData/techs.js` a `data/` (o mantener carpeta,
  decision menor). Se importan directamente en Server/Client Components. Sin fetch.

## Manejo de errores / edge cases

- Si framer-motion en su version nueva requiere `"use client"` explicito (lo requiere),
  ya esta cubierto por los wrappers en `Animations/*`.
- `Footer` necesita mostrar el año **actual del visitante**, no el del build. En SSG,
  `new Date().getFullYear()` dentro de un Server Component se evaluaria en build y quedaria
  congelado. Solucion: `Footer` sigue siendo Server Component y delega el año a un Client
  Component hoja (`Atoms/CurrentYear`), que lo calcula en el navegador. Ver seccion
  "Componente del año actual".
- Verificar que ningun Server Component importe modulos que usen APIs de navegador.

## Estrategia de testing / verificacion

- No se agregan tests unitarios (no solicitados).
- Verificacion por build:
  1. `next build` sin errores; la ruta `/` figura como estatica (prerenderizada).
  2. `next dev` sin errores de client/server boundary en consola.
  3. Revision visual: secciones, animaciones, enlaces e imagenes intactos.

## Plan de migracion (alto nivel)

1. Actualizar dependencias.
2. Crear `app/layout.js` y `app/page.js`; mover estilos globales.
3. Añadir `"use client"` a los componentes que lo requieren.
4. Convertir metadata a la API del App Router.
5. Eliminar `pages/` y ajustar `next.config.js`.
6. Reubicar datos si aplica.
7. Build + verificacion.
