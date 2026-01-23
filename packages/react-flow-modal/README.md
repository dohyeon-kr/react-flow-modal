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

## Basic Usage

```JSX
import { ModalProvider, ModalHost, useModal } from "react-flow-modal";

function App() {
    const modal = useModal();

    const onClick = async () => {
        const result = await modal.open("confirm", 
        (resolve, reject) => (
            <ConfirmModal
                onConfirm={() => resolve(true)}
                onCancel={() => resolve(false)}
            />
        ));

        // Resolving or rejecting the promise will also remove the modal from the stack

        console.log(result);
    };

    return <button onClick={onClick}>Open modal</button>;
}

export default function Root() {
  return (
    <ModalProvider>
      <App />
      <ModalHost />
    </ModalProvider>
  );
}
```

## API

### open
```TS
open<T>(
  key: string,
  render: (
    resolve: (value: T) => void,
    reject: (reason?: unknown) => void
  ) => React.ReactNode
): Promise<T>
```

## Important

> ⚠️ Make sure to always resolve or reject the promise.
> Leaving it pending will block the async flow.

## Why react-flow-modal?

Most modal libraries are state-driven:
```JSX
setOpen(true);
```

This makes modal control implicit and tightly coupled to rendering.

react-flow-modal treats modals as explicit async control points:

```JSX
const result = await open(...);
```

This keeps control flow readable, composable, and testable.

## Features

- Headless API (no styles, no UI constraints)
- Promise-based modal control
- Stack-based modal rendering
- Fully controlled by user events
- Works naturally with async / await

## License

MIT