# Tasks — Mejoras de performance (Next.js 16 + Vercel + SSG)

- [x] 1. Fase 1 — Fuentes con `next/font/local`
  - Cargar Inter (Regular 400 y Bold 700) con `next/font/local` en `app/layout.js`,
    exponiendo `--font-inter` y aplicando la className/variable al `<html>`.
  - Quitar los `@font-face` manuales de `styles/globals.scss` y usar la variable en `body`.
  - Reemplazar `font-family: "Inter-Bold"` en modulos SCSS por `font-weight: 700`.
  - _Requisitos: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Fase 2 — Config e imagenes
  - En `next.config.js`: `deviceSizes`, `imageSizes` y `formats: ['image/avif','image/webp']`.
  - En `Atoms/Image/Img.js`: eliminar el `<picture>`/`<source>` hardcodeado y parametrizar
    `sizes` (prop con default para imagenes de contenido).
  - En `Molecules/Technology`: servir los logos SVG con `<img>` nativa con `width`/`height`
    y `loading="lazy"`, en vez de `next/image` con `fill`.
  - Mantener `priority` en la imagen del Home (LCP).
  - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 3. Fase 3 — Reducir framer-motion (hovers a CSS)
  - Crear utilidad CSS `.hoverScale` (scale en `:hover`/`:active`) en `globals.scss`.
  - En `Technology`: eliminar `AnimatedButton`, aplicar `.hoverScale`; dejar el componente
    como Server Component.
  - En `Project`: eliminar `AnimatedButton` en los enlaces Demo/GitHub, aplicar `.hoverScale`.
  - Eliminar `components/Animations/Button/AnimationButton.js` (codigo muerto).
  - Mantener framer-motion solo en `AnimationList`/`AnimationItem` + `Projects`.
  - _Requisitos: 3.1, 3.2, 3.3, 3.4_

- [x] 4. Fase 4 — CDN + reduced-motion
  - En `next.config.js`: `async headers()` con `Cache-Control` inmutable para
    `/images/:path*`, `/logos/:path*`, `/fonts/:path*`.
  - En `globals.scss`: `scroll-behavior: smooth` solo bajo
    `prefers-reduced-motion: no-preference`; bloque `reduce` que minimiza animaciones y
    anula `.hoverScale`.
  - _Requisitos: 4.1, 4.2, 4.3_

- [x] 5. Verificar build
  - `next build` sin errores y ruta `/` estatica.
  - Sin imports colgados de `AnimatedButton` ni `@font-face` duplicados.
  - _Requisitos: 5.1, 5.2, 5.3_
