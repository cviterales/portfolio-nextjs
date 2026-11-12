---
name: rtl
description: Tests unitarios con Jest + React Testing Library. Usar al escribir specs de componentes, hooks o utils.
---

```tsx
describe('ProjectTile', () => {
  describe('cuando se hace click', () => {
    it('llama a onOpen', async () => {
      // Given
      const user = userEvent.setup();
      const onOpen = jest.fn();
      render(<ProjectTile projectId="a" onOpen={onOpen} />);
      // When
      await user.click(screen.getByRole('button', { name: /abrir/i }));
      // Then
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });
});
```

- Agrupar por comportamiento; Given/When/Then.
- Queries: `getByRole` > `getByLabelText` > `getByText` > `getByTestId` (último recurso). Nunca `querySelector`.
- `userEvent`, no `fireEvent`. Async: `findBy*`; una sola aserción por `waitFor`.
- Mocks: preferir `jest.spyOn`; `jest.restoreAllMocks()` en `afterEach`.
- Probar comportamiento visible, no estado interno ni libs de terceros.
- Utils puras (`src/utils/`): tests directos sin render.
