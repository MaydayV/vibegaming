'use client';

import { useEffect, useState } from 'react';

interface AnimatedSubtitleProps {
    line1: string;
    line2: string;
}

export default function AnimatedSubtitle({ line1, line2 }: AnimatedSubtitleProps) {
    const [showLine2, setShowLine2] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowLine2(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center gap-2">
            {/* Line 1: Dissolve / Fade In */}
            <span className="text-xl sm:text-2xl text-gray-300 leading-relaxed animate-in fade-in blur-in duration-1000">
                {line1}
            </span>

            {/* Line 2: Typewriter-ish slide & fade */}
            <div className="h-8 overflow-hidden">
                {showLine2 && (
                    <span
                        className="text-lg sm:text-xl text-neon-blue/80 font-mono tracking-wide animate-in slide-in-from-bottom-2 fade-in duration-700 block"
                        style={{ textShadow: '0 0 10px rgba(0, 245, 255, 0.3)' }}
                    >
                        {line2}
                    </span>
                )}
            </div>
        </div>
    );
}
