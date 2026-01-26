import { useTranslations } from 'next-intl';
import { games } from '@/content/games';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgressiveGrid from '@/components/ProgressiveGrid';

export default function GamesPage() {
    const t = useTranslations('games');

    // Sort by createdAt desc
    const sortedGames = [...games].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
            <Navbar />

            <main className="flex-grow pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[128px] pointer-events-none" />

                <div className="mb-16 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 neon-text-glow text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                        {t('title')}
                    </h1>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed">
                            {t('subtitle_desc')}
                        </p>
                        <p className="text-2xl md:text-3xl font-black uppercase tracking-widest text-transparent [-webkit-text-stroke:1px_#FF2BD6] hover:[-webkit-text-stroke:1px_#00F5FF] transition-colors cursor-default drop-shadow-[0_0_10px_rgba(255,43,214,0.5)]">
                            {t('subtitle_action')}
                        </p>
                    </div>
                </div>

                {sortedGames.length > 0 ? (
                    <ProgressiveGrid games={sortedGames} />
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-gray-500 text-lg">{t('empty')}</p>
                    </div>
                )}

                {/* Placeholder for Load More logic if needed */}
                {/* <div className="mt-12 text-center text-gray-500 animate-pulse">{t('loadingMore')}</div> */}

                <div className="mt-8 text-center text-xs text-gray-600">
                    {t('externalHint')}
                </div>
            </main>

            <Footer />
        </div>
    );
}
