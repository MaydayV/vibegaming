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
        console.log('AnimatedSubtitle mounted. Line 1:', line1);
        const startTimer = setTimeout(() => {
            console.log('Starting typewriter for Line 2...');
            setIsTyping(true);
        }, 1200); // Increased delay slightly for better sync with Line 1

        return () => clearTimeout(startTimer);
    }, [line1]);

    useEffect(() => {
        if (!isTyping) return;

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < line2.length) {
                setDisplayedLine2(line2.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
                console.log('Typewriter finished.');
            }
        }, 70); // Slightly slower for better readability

        return () => clearInterval(typingInterval);
    }, [isTyping, line2]);

    return (
        <div className="flex flex-col items-center gap-4 py-4 select-none">
            {/* Line 1: Dissolve */}
            <span className="text-xl sm:text-2xl text-gray-300 leading-relaxed animate-dissolve">
                {line1}
            </span>

            {/* Line 2: Pixel Typewriter */}
            <div className="min-h-[2rem] flex items-center justify-center font-mono">
                <span
                    className="text-lg sm:text-xl text-neon-cyan tracking-wider"
                    style={{ textShadow: '0 0 10px rgba(0, 245, 255, 0.4)' }}
                >
                    {displayedLine2}
                    {/* Retro Blinking Cursor: On/Off instead of pulse */}
                    <span className="inline-block ml-1 opacity-100 animate-[blink_1s_steps(2)_infinite]">
                        {displayedLine2.length < line2.length || isTyping ? '▊' : '_'}
                    </span>
                </span>
            </div>
        </div>
    );
}
