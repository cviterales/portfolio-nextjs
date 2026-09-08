# Requirements — Migracion a Next.js (App Router + RSC, sitio estatico en Vercel)

## Introduccion

El portfolio actual usa Next.js 13 con el **Pages Router** (`pages/`), React 18 y varios
componentes de cliente (framer-motion, react-intersection-observer). El objetivo es
actualizar el proyecto a la **ultima version de Next.js** y migrar al **App Router**
(`app/`), maximizando el uso de **React Server Components (RSC)** y enviando el minimo de
JavaScript al cliente.

La pagina debe permanecer **estatica**, entendida como **prerenderizado estatico (SSG)**
generado en build time y servido desde **Vercel** (CDN). No se usa export estatico
(`output: 'export'`); se conservan capacidades de Vercel como la optimizacion de
imagenes. La UI, el contenido y el comportamiento visibles deben preservarse.

## Requisitos

### Requisito 1 — Actualizar dependencias a la ultima version

**Historia de usuario:** Como mantenedor del proyecto, quiero el stack en su ultima
version estable, para tener soporte, seguridad y las APIs modernas del framework.

#### Criterios de aceptacion
1. CUANDO se instalen dependencias ENTONCES `next`, `react` y `react-dom` DEBEN estar en
   su ultima version mayor estable compatible entre si.
2. CUANDO se actualicen las dependencias ENTONCES las librerias de cliente
   (`framer-motion`, `react-icons`, `react-intersection-observer`, `sass`) DEBEN quedar
   en versiones compatibles con la nueva version de React/Next.
3. CUANDO se termine la actualizacion ENTONCES `npm install` (o el gestor usado) DEBE
   completarse sin errores de dependencias.
4. SI alguna dependencia queda obsoleta o sin uso tras la migracion ENTONCES DEBE
   eliminarse del `package.json`.

### Requisito 2 — Migrar de Pages Router a App Router

**Historia de usuario:** Como desarrollador, quiero usar el App Router, para aprovechar
RSC, layouts y la API de metadata.

#### Criterios de aceptacion
1. CUANDO se cree la estructura `app/` ENTONCES DEBE existir `app/layout.js` (root layout
   con `<html>` y `<body>`) y `app/page.js` (pagina principal).
2. CUANDO se migre el contenido ENTONCES `pages/index.js`, `pages/_app.js` y
   `pages/_document.js` DEBEN eliminarse y su comportamiento DEBE quedar cubierto por
   `app/`.
3. CUANDO se definan `<meta>`, `<title>`, `lang` y favicon ENTONCES DEBEN expresarse con
   la API `metadata` del App Router en lugar de `next/head` y `_document`.
4. CUANDO se importen estilos globales ENTONCES DEBEN cargarse desde `app/layout.js`.
5. CUANDO termine la migracion ENTONCES NO DEBE quedar el directorio `pages/`.

### Requisito 3 — Maximizar React Server Components

**Historia de usuario:** Como desarrollador, quiero que la mayor cantidad de componentes
sean Server Components, para reducir el JavaScript enviado al cliente.

#### Criterios de aceptacion
1. CUANDO un componente no use estado, efectos, eventos ni APIs del navegador ENTONCES
   DEBE permanecer como Server Component (sin `"use client"`).
2. CUANDO un componente use framer-motion, IntersectionObserver, hooks de React o
   handlers de eventos ENTONCES DEBE marcarse con `"use client"`.
3. CUANDO un Organism contenga una parte interactiva ENTONCES la directiva `"use client"`
   DEBE colocarse en el componente hoja mas especifico posible, no en toda la seccion.
4. CUANDO se revise el resultado ENTONCES los siguientes DEBEN ser Server Components:
   `Header`, `Home`, `About`, `Footer`, `Title`, `Card`, `Img`.
5. CUANDO se revise el resultado ENTONCES los siguientes DEBEN ser (o contener) Client
   Components: los wrappers de `Animations/*` y la parte de `Projects` que usa `useInView`.

### Requisito 4 — Mantener el sitio estatico (SSG) en Vercel

**Historia de usuario:** Como responsable del deploy, quiero que la pagina se prerenderice
estaticamente en build y se sirva desde Vercel, para maxima performance y bajo costo.

#### Criterios de aceptacion
1. CUANDO se ejecute `next build` ENTONCES la ruta principal DEBE marcarse como estatica
   (prerenderizada, no dinamica).
2. LA configuracion NO DEBE usar `output: 'export'`.
3. LA optimizacion de imagenes de `next/image` DEBE permanecer habilitada (sin
   `unoptimized`).
4. NO DEBEN introducirse funciones dinamicas de servidor en request time (cookies,
   headers, `searchParams` dinamicos, `dynamic = 'force-dynamic'`).
5. EL contenido (proyectos, tecnologias) DEBE resolverse en build a partir de modulos de
   datos estaticos.

### Requisito 5 — Preservar UI, contenido y comportamiento

**Historia de usuario:** Como visitante del portfolio, quiero que la pagina se vea y se
comporte igual que antes de la migracion.

#### Criterios de aceptacion
1. CUANDO se cargue la pagina migrada ENTONCES DEBE mostrar las mismas secciones: Header,
   Home, Projects, About, Footer.
2. LAS animaciones de framer-motion (lista de proyectos, hover/tap) DEBEN seguir
   funcionando.
3. LOS estilos (SCSS Modules y globales) DEBEN aplicarse igual que antes.
4. LOS enlaces (proyectos, redes, CV, contacto) DEBEN seguir funcionando con
   `target="_blank"` y `rel="noopener noreferrer"` donde corresponda.
5. LAS imagenes y logos DEBEN renderizarse correctamente con `next/image`.

### Requisito 7 — Año del footer siempre actualizado (no del build)

**Historia de usuario:** Como visitante, quiero que el año del footer refleje el año
actual al momento de visitar la pagina, no el año en que se hizo el build, para que el
copyright nunca quede desactualizado.

#### Criterios de aceptacion
1. CUANDO un visitante cargue la pagina ENTONCES el año mostrado en el footer DEBE ser el
   año actual del cliente (`new Date().getFullYear()` evaluado en el navegador), no el
   valor congelado en build time.
2. EL calculo del año DEBE aislarse en un Client Component hoja lo mas pequeño posible.
3. EL componente `Footer` DEBE permanecer como Server Component; solo la porcion del año
   corre en cliente.
4. SI la logica del año se reutiliza en mas de un lugar ENTONCES DEBE extraerse a un hook
   reutilizable (`"use client"`); si no se reutiliza, basta el Client Component.
5. LA migracion a cliente del año NO DEBE romper el prerenderizado estatico del resto de
   la pagina.

### Requisito 6 — Verificacion del build

**Historia de usuario:** Como mantenedor, quiero verificar que el proyecto compila y se
prerenderiza correctamente antes de dar por cerrada la migracion.

#### Criterios de aceptacion
1. CUANDO se ejecute `next build` ENTONCES DEBE completarse sin errores.
2. CUANDO se ejecute `next dev` ENTONCES la pagina DEBE renderizarse sin errores de
   consola relacionados con RSC/Client boundaries.
3. SI el build reporta uso indebido de APIs de cliente en Server Components ENTONCES DEBE
   corregirse antes de finalizar.
