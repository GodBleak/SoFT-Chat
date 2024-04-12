import { HydrationScript } from 'solid-js/web';
import type { Component, JSX } from 'solid-js';
import "./assets/index.css"

interface DocumentProps {
    children: JSX.Element;
}
export const Document: Component<DocumentProps> = (props) => {
    return (
        <html lang="en" $ServerOnly data-theme="dark">
            <head>
                <title>SoFT Chat</title>
                <meta charset="utf-8" />
                <link rel="icon" href="/public/images/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script src="/src/web/hydrate.tsx" type="module" async></script>
                <HydrationScript />
            </head>
            <body>
                <noscript>You need JavaScript to run this app.</noscript>
                {props.children}
            </body>
        </html>
    )
};