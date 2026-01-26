import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
    const t = useTranslations('about');

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <div className="space-y-12">
                    {/* Intro */}
                    <section>
                        <h1 className="text-4xl font-bold mb-8 neon-text-glow text-neon-purple">{t('title')}</h1>
                        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                            <p>{t('p1')}</p>
                            <p>{t('p2')}</p>
                        </div>
                    </section>

                    {/* Celebrate */}
                    <section className="glass-panel p-8 rounded-2xl border-l-4 border-neon-cyan">
                        <h2 className="text-2xl font-bold mb-6 text-white">{t('celebrateTitle')}</h2>
                        <ul className="space-y-4 text-gray-300">
                            <ListItem text={t('c1')} />
                            <ListItem text={t('c2')} />
                            <ListItem text={t('c3')} />
                            <ListItem text={t('c4')} />
                        </ul>
                    </section>


                    {/* FAQ */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 text-white neon-text-glow">{t('faqTitle')}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FaqItem q={t('faq1Q')} a={t('faq1A')} />
                            <FaqItem q={t('faq2Q')} a={t('faq2A')} />
                            <FaqItem q={t('faq3Q')} a={t('faq3A')} />
                            <FaqItem q={t('faq4Q')} a={t('faq4A')} />
                        </div>
                    </section>

                    {/* Submit */}
                    <section className="text-center py-12 border-t border-white/10">
                        <h2 className="text-2xl font-bold mb-4 text-white">{t('submitTitle')}</h2>
                        <p className="text-gray-400 mb-8">{t('submitBody')}</p>
                        <p className="text-sm text-gray-600">{t('contact')}</p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function ListItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan flex-shrink-0" />
            {text}
        </li>
    );
}

function FaqItem({ q, a }: { q: string, a: string }) {
    return (
        <div className="glass-panel p-6 rounded-xl border-t border-white/5 hover:border-neon-purple/30 transition-colors">
            <h3 className="font-bold text-neon-cyan mb-2">{q}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
        </div>
    );
}
