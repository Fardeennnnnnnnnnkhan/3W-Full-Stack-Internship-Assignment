import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:3000' 
  : 'https://threew-full-stack-internship-assignment-1.onrender.com';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


