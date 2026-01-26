import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitch from './LanguageSwitch';

export default function Navbar() {
    const t = useTranslations('nav');

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <span className="text-xl font-bold font-mono tracking-tighter text-neon-cyan neon-text-glow">
                            VibeGam.ing
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <NavLink href="/">{t('home')}</NavLink>
                            <NavLink href="/games">{t('games')}</NavLink>
                            <NavLink href="/about">{t('about')}</NavLink>
                        </div>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        <LanguageSwitch />
                        <Link
                            href="https://github.com/MaydayV/vibegaming"
                            target="_blank"
                            className="hidden md:inline-flex items-center px-4 py-1.5 border border-neon-pink/50 text-neon-pink rounded text-sm font-medium hover:bg-neon-pink/10 hover:shadow-[0_0_10px_rgba(255,43,214,0.3)] transition-all"
                        >
                            {t('submit')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-gray-300 hover:text-neon-cyan hover:drop-shadow-[0_0_5px_rgba(0,245,255,0.5)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
            {children}
        </Link>
    );
}
