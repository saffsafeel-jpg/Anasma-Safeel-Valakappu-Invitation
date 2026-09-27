import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against third-party cross-origin script errors (e.g., GSI, iframes)
window.addEventListener('error', (event) => {
  if (
    !event.message ||
    event.message === 'Script error.' ||
    event.filename?.includes('youtube.com') ||
    event.filename?.includes('google')
  ) {
    event.preventDefault();
    return true;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (!event.reason || event.reason?.message === 'Script error.') {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
