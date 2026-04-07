'use client';

import { useEffect, useRef } from 'react';

function play8bitChime(ctx: AudioContext) {
    const notes = [
        { freq: 523.25, start: 0, dur: 0.1 },     // C5
        { freq: 659.25, start: 0.1, dur: 0.1 },     // E5
        { freq: 783.99, start: 0.2, dur: 0.1 },     // G5
        { freq: 1046.5, start: 0.3, dur: 0.2 },     // C6
        { freq: 783.99, start: 0.5, dur: 0.08 },    // G5
        { freq: 1046.5, start: 0.58, dur: 0.25 },   // C6
    ];

    const master = ctx.createGain();
    master.gain.value = 0.3;
    master.connect(ctx.destination);

    for (const note of notes) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = note.freq;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.5, ctx.currentTime + note.start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.start + note.dur);

        osc.connect(gain);
        gain.connect(master);
        osc.start(ctx.currentTime + note.start);
        osc.stop(ctx.currentTime + note.start + note.dur + 0.05);
    }
}

export default function RetroAudio() {
    const played = useRef(false);

    useEffect(() => {
        if (played.current) return;
        played.current = true;

        const handleInteraction = () => {
            const ctx = new AudioContext();
            play8bitChime(ctx);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };

        // Try autoplay first; fall back to first interaction
        try {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') {
                // Needs user gesture — listen for first interaction
                window.addEventListener('click', handleInteraction, { once: true });
                window.addEventListener('keydown', handleInteraction, { once: true });
                window.addEventListener('touchstart', handleInteraction, { once: true });
            } else {
                play8bitChime(ctx);
            }
        } catch {
            window.addEventListener('click', handleInteraction, { once: true });
        }

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    return null;
}
