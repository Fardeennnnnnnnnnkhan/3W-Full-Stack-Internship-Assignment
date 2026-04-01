import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Use VITE_API_URL for production or localhost for development
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


