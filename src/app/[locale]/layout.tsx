import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import type { Metadata } from 'next';
import PwaHandler from '@/components/PwaHandler';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://vibegam.ing'),
    title: {
        template: '%s | VibeGam.ing',
        default: 'VibeGam.ing - Curated AI Games Showcase',
    },
    description: 'A community-driven gallery for games created with AI. Play experiments, jams, and polished releases directly in your browser.',
    applicationName: 'VibeGam.ing',
    authors: [{ name: 'VibeGaming Community' }],
    keywords: ['AI games', 'indie games', 'game showcase', 'web games', 'cyberpunk', 'nextjs'],
    alternates: {
        languages: {
            'en': '/en',
            'zh': '/zh',
        },
    },
    openGraph: {
        title: 'VibeGam.ing - Curated AI Games',
        description: 'Discover and play games made with AI. Submit yours via PR.',
        url: 'https://vibegam.ing',
        siteName: 'VibeGam.ing',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'VibeGam.ing',
        description: 'Curated AI Games Showcase',
        creator: '@vibegaming',
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'VibeGam.ing',
    },
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <PwaHandler />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
