import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {AuthProvider} from "./Context/AuthContext.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Failed to find the root element');
}
createRoot(rootElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<div style={{ padding: '2rem', fontFamily: 'var(--font-sans)' }}>Loading framework...</div>}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Suspense>
        </QueryClientProvider>
    </StrictMode>,
);