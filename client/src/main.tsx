import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
console.log(GOOGLE_CLIENT_ID)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#22272b',
              color: '#dee4ea',
              border: '1px solid #3a4450',
              fontSize: '13px',
            },
            success: { iconTheme: { primary: '#4bce97', secondary: '#22272b' } },
            error: { iconTheme: { primary: '#f87168', secondary: '#22272b' } },
          }}
        />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
