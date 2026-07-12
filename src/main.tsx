import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<div style={{ padding: '2rem', fontFamily: 'var(--font-sans)' }}>Loading framework...</div>}>
                <App />
            </Suspense>
        </QueryClientProvider>
    </StrictMode>,
);