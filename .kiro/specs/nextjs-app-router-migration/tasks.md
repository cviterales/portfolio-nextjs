# Tasks — Migracion a Next.js (App Router + RSC, SSG en Vercel)

- [x] 1. Actualizar dependencias a la ultima version
  - Actualizar `next` a la ultima estable (16.x), `react` y `react-dom` a 19.x en `package.json`.
  - Actualizar `framer-motion`, `react-icons`, `react-intersection-observer`, `sass` y
    `@next/bundle-analyzer` a versiones compatibles.
  - Quitar la dependencia `yarn` del bloque `dependencies` (no debe estar ahi).
  - Ejecutar la instalacion y confirmar que resuelve sin errores.
  - _Requisitos: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Crear el root layout del App Router
  - Crear `app/layout.js` como Server Component con `<html lang="en">` y `<body>{children}</body>`.
  - Importar los estilos globales (`styles/globals.scss`) en el layout.
  - _Requisitos: 2.1, 2.4, 5.3_

- [x] 3. Migrar metadata a la API del App Router
  - En `app/layout.js` exportar `metadata` (title, description, keywords, icons/favicon).
  - Exportar `viewport` (incluye `width=device-width, initial-scale=1` y `themeColor`).
  - _Requisitos: 2.3_

- [x] 4. Crear la pagina principal como Server Component
  - Crear `app/page.js` reproduciendo el markup de `pages/index.js`
    (`wrapper` > `header`/`main`/`footer`) y componiendo los Organisms.
  - No incluir `"use client"` en `page.js`.
  - _Requisitos: 2.1, 3.1, 5.1_

- [x] 5. Marcar los Client Components de animacion
  - Añadir `"use client"` al inicio de `Animations/List/AnimationList.js`,
    `Animations/List/Item/AnimationItem.js` y `Animations/Button/AnimationButton.js`.
  - _Requisitos: 3.2, 3.3, 3.5, 5.2_

- [x] 6. Ajustar `Projects` como Client Component
  - Añadir `"use client"` a `Organisms/Projects/Projects.js` (usa `useInView`).
  - Verificar que los datos (`projectData`) se sigan importando y mapeando correctamente.
  - _Requisitos: 3.2, 3.5, 5.1, 5.2_

- [x] 7. Confirmar que el resto de componentes queden como Server Components
  - Verificar que `Header`, `Home`, `About`, `Footer`, `Title`, `Card`, `Img`,
    `Molecules/Project` y `Molecules/Technology` NO tengan `"use client"`.
  - Confirmar que ninguno importe APIs de navegador ni hooks de cliente.
  - _Requisitos: 3.1, 3.4, 5.1, 5.5_

- [x] 7.1. Crear el Client Component `CurrentYear` y usarlo en el Footer
  - Crear `components/Atoms/CurrentYear/CurrentYear.js` con `"use client"` que calcule
    `new Date().getFullYear()` e inicialice el estado, actualizandolo en `useEffect` tras
    el montaje para reflejar el año real del visitante.
  - Modificar `Organisms/Footer/Footer.js` para renderizar `<CurrentYear />` en lugar de
    `new Date().getFullYear()` inline, manteniendo `Footer` como Server Component.
  - (Solo si se reutiliza en otro lugar) extraer la logica a `hooks/useCurrentYear.js`
    (`"use client"`) y consumirlo desde `CurrentYear`.
  - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. Eliminar el Pages Router
  - Borrar `pages/index.js`, `pages/_app.js`, `pages/_document.js` y el directorio `pages/`.
  - _Requisitos: 2.2, 2.5_

- [x] 9. Ajustar `next.config.js`
  - Quitar `swcMinify` (ya es default / removido).
  - Mantener `@next/bundle-analyzer` y `images` (sin `unoptimized`, sin `output: 'export'`).
  - _Requisitos: 4.2, 4.3_

- [ ] 10. (Opcional) Reubicar datos estaticos
  - Mover `dummyData/projectData.js` y `dummyData/techs.js` a `data/` y actualizar imports,
    o mantener la carpeta actual si se prefiere minimizar cambios.
  - _Requisitos: 4.5_

- [x] 11. Verificar build y prerenderizado estatico
  - [x] `next build` (Next 16.3.4) compila sin errores; la ruta `/` figura como
    "(Static) prerendered as static content".
  - [ ] Ejecutar `next dev` (`pnpm dev`) y revisar visualmente: secciones, animaciones,
    enlaces e imagenes intactos, sin errores de client/server boundary en consola.
  - _Requisitos: 4.1, 4.4, 5.4, 6.1, 6.2, 6.3_
