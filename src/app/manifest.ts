import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'VibeGam.ing',
        short_name: 'VibeGam.ing',
        description: 'Curated AI Games Showcase',
        start_url: '/',
        display: 'standalone',
        background_color: '#070A12',
        theme_color: '#070A12',
        icons: [
            {
                src: '/icon?size=192',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon?size=512',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    };
}
