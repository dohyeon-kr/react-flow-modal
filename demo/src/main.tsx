import { AnimatePresence } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ModalHost, ModalProvider } from 'react-flow-modal';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <App />
      <ModalHost>
        {(modals) => (
          <AnimatePresence>
            {modals}
          </AnimatePresence>
        )}
      </ModalHost>
    </ModalProvider>
  </StrictMode>,
)
