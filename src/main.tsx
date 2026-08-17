import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { captureAttribution } from './lib/attribution'
import { loadCookiebot } from './lib/cookiebot'

captureAttribution();
loadCookiebot();

createRoot(document.getElementById("root")!).render(<App />);
