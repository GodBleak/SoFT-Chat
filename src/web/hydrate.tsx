import { ErrorBoundary, hydrate } from 'solid-js/web';
import { App } from './app';
import { Document } from './document';
import { ClientProvider } from "./contexts/client";
import { AuthenticationProvider } from './contexts/authentication';
import { ErrorModal } from './components/errorModal';

hydrate(
    () => {
        return (
            <Document>
                <ErrorBoundary fallback={(err, reset) => <ErrorModal error={err} reset={reset} />}>
                    <ClientProvider>
                        <AuthenticationProvider>
                            <App />
                        </AuthenticationProvider>
                    </ClientProvider>
                </ErrorBoundary>
            </Document>
        )
    },
    document,
);