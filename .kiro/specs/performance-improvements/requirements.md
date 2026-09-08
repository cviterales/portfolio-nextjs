# Requirements — Mejoras de performance (Next.js 16 + Vercel + SSG)

## Introduccion

El portfolio ya esta migrado a Next.js 16 con App Router, RSC y prerenderizado estatico
en Vercel. Este spec aplica mejoras de performance aprovechando la infraestructura de
Vercel (CDN, optimizacion de imagenes) sin romper el prerenderizado estatico ni cambiar la
UI visible. Foco: LCP, CLS, tamano del bundle de cliente y aprovechamiento del CDN.

## Requisitos

### Requisito 1 — Optimizar carga de fuentes

**Historia de usuario:** Como visitante, quiero que las fuentes carguen rapido y sin
saltos de layout, para una mejor experiencia percibida.

#### Criterios de aceptacion
1. LAS fuentes DEBEN cargarse con `next/font/local` (self-hosting optimizado) en lugar de
   `@font-face` manual en SCSS.
2. LA fuente critica DEBE precargarse automaticamente (`preload`) y aplicarse via variable
   CSS o `className` en el root.
3. NO DEBEN quedar `@font-face` manuales que dupliquen la carga de las mismas fuentes.
4. EL cambio NO DEBE introducir CLS por swap de fuente (usar el ajuste de metricas de
   `next/font`).

### Requisito 2 — Optimizar imagenes

**Historia de usuario:** Como visitante en cualquier dispositivo, quiero recibir imagenes
del tamano y formato adecuados, para cargar menos bytes.

#### Criterios de aceptacion
1. `next.config.js` DEBE definir una escala de `deviceSizes` e `imageSizes` razonable (no
   un unico tamano de 1920).
2. `next.config.js` DEBE habilitar `formats: ['image/avif', 'image/webp']`.
3. EL componente de imagen NO DEBE forzar un `srcSet`/`source` hardcodeado que muestre una
   imagen incorrecta en mobile.
4. LAS imagenes pequenas (logos de tecnologias) NO DEBEN declararse con `sizes="100vw"`;
   deben usar un `sizes` acorde a su tamano real.
5. LOS logos SVG NO DEBEN pasar por la optimizacion de `next/image` (se sirven directo).
6. LA imagen LCP (foto del Home) DEBE mantener `priority`; el resto DEBE ser lazy por
   defecto.

### Requisito 3 — Reducir JavaScript de cliente (animaciones)

**Historia de usuario:** Como visitante, quiero menos JavaScript en el cliente, para que
la pagina sea interactiva antes.

#### Criterios de aceptacion
1. LOS micro-hovers de escala (logos de tecnologias y botones de proyecto) DEBEN
   implementarse con CSS (`transform: scale`) en lugar de framer-motion.
2. framer-motion DEBE quedar limitado a la animacion de entrada de la lista de proyectos.
3. EL comportamiento visual de los hovers DEBE mantenerse equivalente (scale en hover/tap).
4. LOS componentes que dejen de usar framer-motion DEBEN poder volver a ser Server
   Components si ya no requieren interactividad de cliente.

### Requisito 4 — Aprovechar el CDN de Vercel y respetar reduced-motion

**Historia de usuario:** Como visitante recurrente, quiero que los assets estaticos se
cacheen agresivamente; y como usuario sensible al movimiento, quiero poder reducir las
animaciones.

#### Criterios de aceptacion
1. `next.config.js` DEBE enviar `Cache-Control` de larga duracion e inmutable para assets
   estaticos servidos desde `public/` (imagenes, logos, fuentes).
2. LOS headers NO DEBEN romper el prerenderizado estatico ni requerir runtime dinamico.
3. EL sitio DEBE respetar `prefers-reduced-motion`: cuando este activo, DEBE desactivar el
   scroll suave y las transiciones/animaciones no esenciales.

### Requisito 5 — No romper build ni comportamiento

**Historia de usuario:** Como mantenedor, quiero que las mejoras no rompan nada.

#### Criterios de aceptacion
1. CUANDO se ejecute `next build` ENTONCES DEBE compilar sin errores y la ruta `/` DEBE
   seguir prerenderizada como estatica.
2. LA UI (secciones, textos, enlaces, imagenes) DEBE verse equivalente a antes.
3. NO DEBE introducirse `output: 'export'` ni `images.unoptimized`.
