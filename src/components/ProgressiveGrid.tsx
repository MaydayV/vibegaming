'use client';

import { useState, useEffect, useRef } from 'react';
import { Game } from '@/content/games';
import GameCard from './GameCard';
import { useTranslations } from 'next-intl';

export default function ProgressiveGrid({ games }: { games: Game[] }) {
    const [visibleCount, setVisibleCount] = useState(20);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('games');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + 20, games.length));
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [games.length]);

    const visibleGames = games.slice(0, visibleCount);
    const hasMore = visibleCount < games.length;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {visibleGames.map(game => (
                    <GameCard key={game.slug} game={game} />
                ))}
            </div>

            {hasMore && (
                <div ref={loadMoreRef} className="mt-12 text-center text-gray-500 animate-pulse">
                    {t('loadingMore')}
                </div>
            )}
        </>
    );
}
