import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LeaveProvider } from './context/LeaveContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LeaveProvider>
        <App />
      </LeaveProvider>
    </BrowserRouter>
  </StrictMode>,
)
