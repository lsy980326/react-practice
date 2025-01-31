import { PopupProvider } from './context/PopupContext';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <PopupProvider>
    <App />
  </PopupProvider>
  // </StrictMode>
)
