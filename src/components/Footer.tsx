import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('home');
    const d = new Date().getFullYear();

    return (
        <footer className="w-full py-8 mt-12 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-neon-cyan/80 font-mono mb-2 neon-text-glow">
                    VibeGam.ing
                </p>
                <p className="text-sm text-gray-400">
                    {t('footerNote')}
                </p>
                <p className="text-xs text-gray-600 mt-4">
                    © {d} VibeGam.ing
                </p>
            </div>
        </footer>
    );
}
