---
name: frontend
description: Receta de componente y checklist del portfolio. Usar al crear o modificar componentes en src/components. Las reglas viven en .claude/rules/frontend.md.
---

## Receta de componente

```tsx
'use client'; // solo si usa hooks/eventos/DOM

import { useState } from 'react';
import styles from './ProjectTile.module.css';
import { PROJECTS } from '@/constant/projects';
import SectionTitle from '@/components/atoms/SectionTitle/SectionTitle';

type ProjectTileProps = {
  projectId: string;
  onOpen?: () => void;
};

export default function ProjectTile({ projectId, onOpen }: ProjectTileProps) {
  const [hovered, setHovered] = useState(false);
  return <article className={styles.container}>...</article>;
}
```

## Design system

- Usar las variantes existentes del componente compartido (p. ej. `Button`); no agregar `className` visuales ad hoc.
- Variante o color nuevo = cambio del design system: se agrega al componente compartido o a `palette.mjs` + `pnpm tokens`, nunca en el sitio de uso.

## Checklist antes de proponer commit

- `pnpm lint` pasa; el usuario corre `pnpm build`.
- Estados de UI cubiertos; accesible por teclado, con roles/ARIA y `alt`.
- Animaciones respetan `prefers-reduced-motion`.
- Sin secretos en código (`.env.local`).
