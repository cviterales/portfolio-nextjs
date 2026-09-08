---
inclusion: always
---

# Arquitectura del proyecto

## Contexto general

Portfolio personal de Cristian Viterales. Es un sitio de una sola pagina (landing),
desplegado en Vercel. No tiene backend propio, base de datos ni APIs dinamicas: todo el
contenido se conoce en tiempo de build.

Objetivo tecnico: mantener la pagina **estatica (prerenderizada en build, SSG)** y usar
**React Server Components (RSC)** siempre que sea posible, enviando el minimo de
JavaScript al cliente.

## Que significa "estatico" en este proyecto

- La pagina se **prerenderiza estaticamente en build time** (Static Site Generation).
  Vercel sirve el HTML generado desde su CDN.
- **NO** se usa export estatico (`output: 'export'`). La infraestructura es Vercel, y se
  aprovechan sus capacidades: optimizacion de imagenes (`next/image`), headers, CDN.
- Como no hay datos dinamicos por request, las rutas deben resolverse como estaticas
  automaticamente (sin funciones dinamicas de servidor en request time).

## Stack

- **Framework:** Next.js (App Router, `app/`).
- **UI:** React con Server Components por defecto.
- **Estilos:** SCSS Modules (`*.module.scss`) + estilos globales en `styles/globals.scss`.
- **Animaciones:** framer-motion (solo en Client Components).
- **Iconos:** react-icons.
- **Imagenes:** `next/image` con optimizacion de Vercel (no `unoptimized`).
- **Deploy:** Vercel (SSG + CDN).

## Principios de renderizado

1. **Server Component por defecto.** Todo componente nace como Server Component. Solo se
   marca `"use client"` cuando realmente necesita interactividad de navegador, estado,
   efectos o APIs del cliente.
2. **Client Components en la hoja del arbol.** La directiva `"use client"` se coloca lo
   mas abajo posible (componentes hoja), para no arrastrar subarboles enteros al cliente.
3. **Prerenderizado estatico.** Las paginas deben resolverse como estaticas en build. No
   introducir funciones dinamicas de servidor en request time (cookies, headers,
   `searchParams` dinamicos, `dynamic = 'force-dynamic'`, ISR con revalidacion por request)
   salvo que sea estrictamente necesario y acordado.
4. **Datos en build.** El contenido vive en modulos estaticos (`data/` o equivalente) y se
   importa directamente en Server Components. No hay fetch en runtime del cliente.

## Que va en cliente vs servidor

| Necesidad | Tipo |
|-----------|------|
| Markup, texto, layout, listas de datos estaticos | Server Component |
| Estilos con SCSS Modules | Cualquiera (funciona en ambos) |
| framer-motion, hover/tap, animaciones | Client Component (`"use client"`) |
| `useState`, `useEffect`, `useRef`, hooks de React | Client Component |
| `react-intersection-observer` (IntersectionObserver) | Client Component |
| Handlers de eventos (`onClick`, etc.) | Client Component |
| `next/image` | Server Component (salvo que dependa de estado cliente) |

## Estructura de carpetas

Se sigue Atomic Design para los componentes:

- `app/` — App Router: `layout.js`, `page.js`, metadata, estilos globales.
- `components/Atoms/` — piezas minimas (Title, Card, Image).
- `components/Molecules/` — combinaciones (Technology, Project).
- `components/Organisms/` — secciones completas (Header, Home, Projects, About, Footer).
- `components/Animations/` — wrappers de animacion (framer-motion), siempre Client Components.
- `data/` — datos estaticos del contenido (proyectos, tecnologias).
- `public/` — assets estaticos (imagenes, logos, fuentes, CV).
- `styles/` — estilos globales.

## Convenciones

- Nombres de componentes en PascalCase; un componente por archivo.
- Estilos co-ubicados: `styles.module.scss` junto al componente.
- Los datos estaticos se importan, no se hacen fetch en cliente.
- Metadata de la pagina se define con la API `metadata` del App Router, no con `<Head>`.
- Los enlaces externos usan `target="_blank"` + `rel="noopener noreferrer"`.

## Restricciones (no hacer)

- No usar export estatico (`output: 'export'`): la infra es Vercel.
- No introducir renderizado dinamico por request que rompa el prerenderizado estatico.
- No convertir a Client Component un arbol entero por una animacion puntual: aislar la
  parte interactiva en un wrapper cliente.
- No agregar dependencias pesadas de cliente si el mismo resultado se logra en servidor.
- No usar `next/dynamic` con `{ ssr: false }` dentro de un Server Component.
