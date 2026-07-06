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
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              fontSize: '13px',
            },
            success: { iconTheme: { primary: 'var(--accent-green)', secondary: 'var(--bg-card)' } },
            error: { iconTheme: { primary: 'var(--accent-red)', secondary: 'var(--bg-card)' } },
          }}
        />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
