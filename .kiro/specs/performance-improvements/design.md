# Design — Mejoras de performance (Next.js 16 + Vercel + SSG)

## Overview

Cuatro fases independientes, de mayor impacto/menor riesgo a menor impacto:
1. Fuentes con `next/font/local`.
2. Optimizacion de imagenes (config + componente `Img`).
3. Reduccion de JS de cliente (framer-motion -> CSS en micro-hovers).
4. Headers de cache del CDN + `prefers-reduced-motion`.

Todo debe preservar el prerenderizado estatico y la UI.

## Fase 1 — Fuentes con `next/font/local`

Estado actual: `globals.scss` declara dos `@font-face` (Inter-Bold, Inter-Regular) con
archivos `.ttf` en `public/fonts`, `font-display: fallback`, sin preload. El body usa
`font-family: "Inter-Regular", "Inter-Bold"`.

Diseno:
- Cargar las fuentes con `next/font/local` en `app/layout.js` (Server Component), apuntando
  a `public/fonts/Inter-Regular.ttf` e `Inter-Bold.ttf`.
- Exponer una variable CSS (`--font-inter`) via `variable` y aplicar la `className` de la
  fuente al `<html>` o `<body>`.
- `next/font` hace self-hosting, `preload` automatico y ajuste de metricas (evita CLS).
- Quitar los `@font-face` manuales del SCSS. Reemplazar los usos de
  `font-family: "Inter-Bold"` en modulos SCSS por peso (`font-weight`) o por la variable,
  segun corresponda. Para no cambiar el look, se mantiene "Inter-Bold" como family a traves
  de una segunda instancia de `next/font` o se usa `font-weight: 700` con la Regular si es
  la misma familia. Decision: cargar Inter como una sola familia con dos pesos via dos
  archivos locales bajo el mismo `localFont` (`weight` 400 y 700), exponiendo
  `--font-inter`; el body usa la variable y donde se pedia "Inter-Bold" se usa
  `font-weight: 700`.

Nota: mantener los `.ttf` porque son los assets disponibles; `next/font` los procesa igual.
No hay dependencia de red externa (cumple SSG y privacidad).

## Fase 2 — Imagenes

### `next.config.js`
- `images.deviceSizes`: escala tipica `[640, 750, 828, 1080, 1200, 1920]`.
- `images.imageSizes`: `[16, 32, 48, 64, 96, 128, 256]` (para imagenes pequenas como logos
  cuando se usan con `next/image`).
- `images.formats`: `['image/avif', 'image/webp']`.

### Componente `Img` (`Atoms/Image/Img.js`)
Problemas actuales:
- `<source srcSet="/images/ag.webp" media="(max-width: 760px)" />` hardcodeado: en mobile
  TODAS las imagenes muestran `ag.webp`. Es un bug de UI ademas de performance. Se elimina
  el `<picture>`/`<source>` y se usa `next/image` directamente.
- `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"` fijo para todo, incluidos
  logos de 50-60px. Se parametriza `sizes` con un prop (default para imagenes grandes).

Diseno de `Img`:
- Recibir `sizes` como prop opcional (default razonable para imagenes de contenido).
- Renderizar `next/image` con `fill`, `priority`, `style={{ objectFit }}` como hoy, dentro
  de un contenedor `position: relative` (sin `<picture>`/`<source>`).

### Logos SVG (`Technology`)
- Los logos viven en `public/logos/*.svg`. Pasarlos por `next/image` con `fill` es costoso
  e innecesario (los SVG no se "optimizan" en tamano por el pipeline de Vercel del mismo
  modo). Se sirven con una `<img>` normal con `width`/`height` explicitos (evita CLS) y
  `loading="lazy"` + `decoding="async"`. Alternativa: `next/image` con `unoptimized` para
  ese caso. Decision: usar `<img>` nativa con dimensiones fijas para los logos, ya que son
  decorativos, de tamano fijo y SVG.

## Fase 3 — Reducir framer-motion (micro-hovers a CSS)

Estado actual:
- `AnimatedButton` (client, framer-motion) envuelve: los dos botones de cada `Project`
  (Demo/GitHub) y CADA logo en `Technology`. En About se renderizan ~24 tecnologias, mas
  las de cada proyecto -> decenas de nodos framer-motion solo para `scale` en hover/tap.
- `AnimationList`/`AnimationItem` (framer-motion) hacen la entrada animada de la lista de
  proyectos con `useInView`.

Diseno:
- Crear una clase CSS reutilizable de "hover-scale" (transform: scale en `:hover` y
  `:active`) y aplicarla donde hoy se usa `AnimatedButton`:
  - En `Technology`: envolver el logo en un `<span>`/`<div>` con la clase; eliminar
    `AnimatedButton`. `Technology` vuelve a ser Server Component puro (solo markup + `<img>`).
  - En `Project`: aplicar la clase a los `<a>` de Demo/GitHub; eliminar `AnimatedButton`.
    `Project` sigue siendo Server Component.
- Mantener framer-motion SOLO en `AnimationList`/`AnimationItem` (entrada de la lista) y en
  `Projects` (que ya es client por `useInView`).
- `AnimatedButton` queda sin usos. Se elimina el archivo para no dejar codigo muerto.
- La clase CSS de hover-scale se agrega a `globals.scss` (utilidad global) o a un modulo;
  se opta por `globals.scss` como utilidad `.hoverScale` reutilizable, con respeto a
  `prefers-reduced-motion`.

Efecto: framer-motion deja de instanciarse decenas de veces; solo la lista de proyectos lo
usa. Menos JS ejecutado en cliente.

## Fase 4 — CDN de Vercel + reduced-motion

### Headers de cache (`next.config.js`)
- Agregar `async headers()` devolviendo `Cache-Control: public, max-age=31536000, immutable`
  para rutas de assets estaticos: `/images/:path*`, `/logos/:path*`, `/fonts/:path*`.
- `headers()` en Next es compatible con prerender estatico (los headers los aplica la capa
  de Vercel/servidor de assets, no requiere runtime dinamico en la pagina).
- Nota: `next/font` ya hostea las fuentes con hashing e immutable; los `/fonts` publicos
  solo importan si quedaran referencias directas. Se agregan igual por seguridad.

### `prefers-reduced-motion` (`globals.scss`)
- `html { scroll-behavior: smooth }` -> envolver en `@media (prefers-reduced-motion: no-preference)`.
- Añadir un bloque `@media (prefers-reduced-motion: reduce)` que reduzca
  transiciones/animaciones (`animation-duration`, `transition-duration` minimos) y anule el
  hover-scale.

## Verificacion

- `next build`: sin errores, ruta `/` estatica.
- Revisar que no queden imports de `AnimatedButton` ni `@font-face` duplicados.
- Revision visual queda a cargo del usuario con `pnpm dev`.
