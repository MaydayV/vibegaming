'use client';

import { useEffect } from 'react';

export default function PwaHandler() {
    useEffect(() => {
        // 1. Register Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                        console.log('SW registered: ', registration);
                    },
                    (registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    }
                );
            });
        }

        // 2. Suppress Install Prompt
        const handler = (e: Event) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            // (optional: store it if we want to show a custom button later)
            // window.deferredPrompt = e;
            console.log('PWA Install prompt suppressed');
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    return null;
}
