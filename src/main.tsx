import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ToasterProvider from './components/ToasterProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToasterProvider />
  </StrictMode>
);