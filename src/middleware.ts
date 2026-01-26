import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    // Match all pathnames except for:
    // - /api, /_next, /_vercel
    // - . (files with extension like .png, .ico, .txt, .webmanifest)
    // - dynamic assets without extension (icon, apple-icon, opengraph-image)
    matcher: ['/((?!api|_next|_vercel|.*\\..*|icon|apple-icon|opengraph-image).*)']
};
