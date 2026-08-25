import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AddressProvider } from './context/AddressContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AddressProvider>
      <App />
    </AddressProvider>
  </StrictMode>,
);
