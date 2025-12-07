import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthProvider'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './routes/Routes'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
<QueryClientProvider client={queryClient}>
    <AuthProvider>

  <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
