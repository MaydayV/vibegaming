import { useTranslations } from 'next-intl';
import { games } from '@/content/games';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameGrid from '@/components/GameGrid';
import AnimatedSubtitle from '@/components/AnimatedSubtitle';
import { ArrowRight, GitFork, FileCode, GitPullRequest, Zap } from 'lucide-react';

export default function HomePage() {
    const t = useTranslations('home');
    const featuredGames = games.filter(g => g.featured).slice(0, 5);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <main className="flex-grow pt-24">
                <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 text-center px-4">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-purple/20 via-background to-background pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter neon-text-glow text-neon-cyan">
                            {t('heroTitle')}
                        </h1>
                        <AnimatedSubtitle
                            line1={t('heroSubtitle1')}
                            line2={t('heroSubtitle2')}
                        />

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <Link
                                href="/games"
                                className="px-8 py-3 bg-neon-cyan text-black font-bold rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] hover:scale-105 transition-all text-lg"
                            >
                                {t('ctaExplore')}
                            </Link>
                            <Link
                                href="https://github.com/MaydayV/vibegaming"
                                target="_blank"
                                className="px-8 py-3 border border-white/10 glass-panel rounded-lg hover:bg-white/5 transition-all flex items-center gap-2 text-gray-300"
                            >
                                <GitPullRequest size={20} />
                                {t('ctaSubmit')}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured Games (Optional, or just value props first?) Document says "Value Props -> How it works". 
            But showing games is always good. I'll stick to Value Props as per doc. */}

                {/* Value Props */}
                <section className="py-20 bg-black/30 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Zap className="text-neon-cyan" size={32} />}
                            title={t('value1Title')}
                            body={t('value1Body')}
                        />
                        <ValueCard
                            icon={<ArrowRight className="text-neon-pink" size={32} />}
                            title={t('value2Title')}
                            body={t('value2Body')}
                        />
                        <ValueCard
                            icon={<FileCode className="text-neon-green" size={32} />}
                            title={t('value3Title')}
                            body={t('value3Body')}
                        />
                    </div>
                </section>

                {/* How it works */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12 text-neon-purple neon-text-glow">{t('howTitle')}</h2>

                        <div className="grid sm:grid-cols-4 gap-6 text-left">
                            <Step number="1" text={t('how1')} icon={<GitFork />} />
                            <Step number="2" text={t('how2')} icon={<FileCode />} />
                            <Step number="3" text={t('how3')} icon={<GitPullRequest />} />
                            <Step number="4" text={t('how4')} icon={<Zap />} />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function ValueCard({ icon, title, body }: { icon: React.ReactNode, title: string, body: string }) {
    return (
        <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-400">{body}</p>
        </div>
    );
}

function Step({ number, text, icon }: { number: string, text: string, icon: React.ReactNode }) {
    return (
        <div className="glass-panel p-6 rounded-xl flex flex-col items-center text-center gap-4 hover:border-neon-purple/50 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold font-mono text-neon-purple group-hover:bg-neon-purple group-hover:text-black transition-colors">
                {number}
            </div>
            <div className="text-gray-400 group-hover:text-white transition-colors text-sm font-medium">
                {text}
            </div>
        </div>
    );
}
