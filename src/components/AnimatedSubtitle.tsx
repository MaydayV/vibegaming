'use client';

import { useEffect, useState } from 'react';

interface AnimatedSubtitleProps {
    line1: string;
    line2: string;
}

export default function AnimatedSubtitle({ line1, line2 }: AnimatedSubtitleProps) {
    const [displayedLine2, setDisplayedLine2] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        // Wait for Line 1 to partially dissolve before starting Line 2
        const startTimer = setTimeout(() => {
            setIsTyping(true);
        }, 1000);

        return () => clearTimeout(startTimer);
    }, []);

    useEffect(() => {
        if (!isTyping) return;

        let index = 0;
        const typingInterval = setInterval(() => {
            setDisplayedLine2(line2.slice(0, index + 1));
            index++;

            if (index >= line2.length) {
                clearInterval(typingInterval);
                setIsTyping(false);
            }
        }, 60);

        return () => clearInterval(typingInterval);
    }, [isTyping, line2]);

    return (
        <div className="flex flex-col items-center gap-4 py-4 select-none">
            {/* Line 1: Dissolve */}
            <span className="text-xl sm:text-2xl text-gray-300 leading-relaxed animate-dissolve">
                {line1}
            </span>

            {/* Line 2: Pixel Typewriter */}
            <div className="min-h-[2rem] flex items-center justify-center">
                <span
                    className="text-lg sm:text-xl text-neon-cyan font-mono tracking-wider block"
                    style={{ textShadow: '0 0 10px rgba(0, 245, 255, 0.4)' }}
                >
                    {displayedLine2}
                    {(isTyping || displayedLine2.length === line2.length) && (
                        <span className="animate-pulse inline-block ml-1">_</span>
                    )}
                </span>
            </div>
        </div>
    );
}
