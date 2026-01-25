import { motion } from "motion/react";
import { useModal } from "react-flow-modal";
import './App.css';
import { useState } from "react";

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
          color: "black",
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
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  const onClick = async () => {
    const result = await modal.open<boolean>("confirm", (resolve) => (
      <ConfirmModal
        key="confirm-modal"
        onConfirm={() => resolve(true)}
        onCancel={() => resolve(false)}
      />
    ));

    setConfirmed(result);
  };

  return (
    <>
      <p>Confirmed: {confirmed ? "Yes" : "No"}</p>
      <button onClick={() => {
        onClick();
      }}>
        Open Confirm Modal
      </button>
    </>
  )
}

export default App;