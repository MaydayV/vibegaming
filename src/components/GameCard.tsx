import { Game } from '@/content/games';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ExternalLink, Play } from 'lucide-react';

export default function GameCard({ game }: { game: Game }) {
    const t = useTranslations('games');

    // Tagline locale fallback: try to detect locale from t('code'), which we just added to messages.
    // Note: 'nav.code' was added, but we are using 'games' namespace here.
    // We need to access 'nav.code' or just 'code' if it was added to root (it wasn't, it was added to 'nav').
    // Let's use a standard 'common' or root key next time, but for now access nav?
    // Actually, useTranslations can be called multiple times.
    const tNav = useTranslations('nav');
    const localeCode = tNav('code') === 'zh' ? 'zh' : 'en';

    return (
        <div className="group relative glass-panel rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] transition-all duration-300 border border-white/5 hover:border-neon-cyan/50 flex flex-col h-full">
            {/* Cover Image - 16:9 Aspect Ratio */}
            <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
                {game.cover ? (
                    <Image
                        src={game.cover}
                        alt={game.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white/10">
                        <Play size={48} />
                    </div>
                )}

                {/* Featured Ribbon */}
                {game.featured && (
                    <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black bg-neon-pink rounded shadow-[0_0_10px_rgba(255,43,214,0.6)]">
                            Featured
                        </span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Link
                        href={game.url}
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-2 rounded-full border border-neon-cyan text-neon-cyan font-bold hover:bg-neon-cyan hover:text-black transition-colors shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                    >
                        <Play size={18} fill="currentColor" />
                        {t('play')}
                    </Link>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                    <Link href={game.url} target="_blank" className="hover:text-neon-cyan transition-colors">
                        <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors truncate">
                            {game.title}
                        </h3>
                    </Link>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 min-h-[40px] mb-4 flex-grow">
                    {/* @ts-ignore */}
                    {game.tagline[localeCode] || game.tagline.en}
                </p>

                <div className="mt-auto pt-3 border-t border-white/5 flex flex-row items-center justify-between sm:flex-col sm:items-start sm:gap-3">
                    {/* Tags Row */}
                    <div className="flex flex-wrap gap-2">
                        {game.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-1 rounded border border-white/5 text-gray-400 group-hover:border-neon-cyan/30 group-hover:text-neon-cyan/80 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Author Row */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:w-full sm:justify-between">
                        <div className="flex items-center gap-1.5">
                            <span>{t('by')}</span>
                            <span className="text-neon-purple font-medium">{game.author}</span>
                        </div>
                    </div>
                </div>            </div>
        </div>
    );
}
