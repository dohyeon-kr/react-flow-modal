import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ModalProvider } from 'react-flow-modal';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>,
)
