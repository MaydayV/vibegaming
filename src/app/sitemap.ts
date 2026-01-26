import { MetadataRoute } from 'next';

export const baseUrl = 'https://vibegam.ing';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['', '/games', '/about'];
    const locales = ['en', 'zh'];

    const sitemapEntries = routes.flatMap((route) =>
        locales.map((locale) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    );

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...sitemapEntries,
    ];
}
