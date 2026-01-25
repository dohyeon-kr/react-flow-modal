# react-flow-modal

Promise-based modal flows for React.

`react-flow-modal` lets you treat modals as async flows using
`Promise` and `async/await`, without coupling your UI to state-driven logic.

---

## Installation

```bash
pnpm add react-flow-modal
# or
npm install react-flow-modal
# or
yarn add react-flow-modal
```

---

## Basic Usage

```tsx
import { ModalProvider, useModal, renderModals } from "react-flow-modal";

function ConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        <h3>Are you sure?</h3>
        <p>This action cannot be undone.</p>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const modal = useModal();

  const onClick = async () => {
    const result = await modal.open("confirm", (resolve) => (
      <ConfirmModal
        onConfirm={() => resolve(true)}
        onCancel={() => resolve(false)}
      />
    ));

    console.log("Result:", result);
  };

  return <button onClick={onClick}>Open Confirm Modal</button>;
}

function ModalRenderer() {
  return renderModals();
}

export default function Root() {
  return (
    <ModalProvider>
      <App />
      <ModalRenderer />
    </ModalProvider>
  );
}
```

---

## With AnimatePresence (Framer Motion)

To support exit animations, modals must be rendered inside the same
React tree as `AnimatePresence`.

```tsx
import { ModalProvider, useModal, renderModals } from "react-flow-modal";
import { motion, AnimatePresence } from "motion/react";

function ConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: "white",
          padding: 24,
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        <h3>Are you sure?</h3>
        <p>This action cannot be undone.</p>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const modal = useModal();

  const onClick = async () => {
    const result = await modal.open("confirm", (resolve) => (
      <ConfirmModal
        onConfirm={() => resolve(true)}
        onCancel={() => resolve(false)}
      />
    ));

    console.log("Result:", result);
  };

  return <button onClick={onClick}>Open Confirm Modal</button>;
}

function ModalRenderer() {
  return (
    <AnimatePresence>
      {renderModals()}
    </AnimatePresence>
  );
}

export default function Root() {
  return (
    <ModalProvider>
      <App />
      <ModalRenderer />
    </ModalProvider>
  );
}
```

---

## API

### useModal

```ts
const modal = useModal();
```

Returns an object that controls the modal flow.

```ts
{
  open<T>(
    key: string,
    render: (
      resolve: (value: T) => void,
      reject: (reason?: unknown) => void
    ) => React.ReactNode
  ): Promise<T>;
}
```

### renderModals
```ts
renderModals(): React.ReactNode
```
Renders the entire modal stack. This function should be rendered **once** in your React tree.

---

## Important

> ⚠️ Always resolve or reject the promise.
> Leaving it pending will block the async flow.

> ⚠️ `renderModals()` should be rendered once.
> Rendering it multiple times may result in duplicated modals.

---

## Why react-flow-modal?

Most modal libraries are state-driven:

```tsx
setOpen(true);
```

This makes modal control implicit and tightly coupled to rendering.

`react-flow-modal` treats modals as explicit async control points:

```tsx
const result = await open(...);
```

This keeps control flow readable, composable, and testable.

---

## Features

* Headless API (no styles, no UI constraints)
* Promise-based modal control
* Internal stack management
* Render location fully controlled by the user
* Works naturally with async / await

---

## License

MIT
