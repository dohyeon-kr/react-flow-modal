import { AnimatePresence, motion } from "motion/react";
import { useState } from 'react';
import { renderModal, useModal } from "react-flow-modal";
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function ConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      key="confirm-modal-container"
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
        key="confirm-modal"
        onConfirm={() => resolve(true)}
        onCancel={() => resolve(false)}
      />
    ));

    console.log("Result:", result);
  };

  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1);
          onClick();
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <AnimatePresence>
        {renderModal()}
      </AnimatePresence>
    </>
  )
}

export default App;