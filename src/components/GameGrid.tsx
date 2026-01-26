import { Game } from '@/content/games';
import GameCard from './GameCard';

export default function GameGrid({ games }: { games: Game[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {games.map(game => (
                <GameCard key={game.slug} game={game} />
            ))}
        </div>
    );
}
