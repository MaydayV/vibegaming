'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { clsx } from 'clsx';

export default function LanguageSwitch() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLocale = () => {
        const nextLocale = locale === 'en' ? 'zh' : 'en';
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggleLocale}
            disabled={isPending}
            className={clsx(
                "px-3 py-1 rounded border transition-all duration-300 font-mono text-sm",
                "border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_10px_rgba(0,245,255,0.3)]",
                isPending && "opacity-50 cursor-not-allowed"
            )}
        >
            {locale === 'en' ? '中文' : 'EN'}
        </button>
    );
}
