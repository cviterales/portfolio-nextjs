---
name: react-19
description: Patrones de React 19 con React Compiler (use(), useActionState, ref como prop). Usar al escribir hooks o componentes con estado/async.
---

```tsx
// use(): leer promesas (suspende) o contexto condicional
const comments = use(commentsPromise);

// Acciones con estado pendiente
const [state, action, isPending] = useActionState(submitForm, null);
<form action={action}><button disabled={isPending}>Enviar</button></form>;

// ref es una prop común
function Input({ ref, ...props }: InputProps) { return <input ref={ref} {...props} />; }
```

Reglas: sin memoización manual, sin `import React`, sin `forwardRef`, Server Components por defecto.
