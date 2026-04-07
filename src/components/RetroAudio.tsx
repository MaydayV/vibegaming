'use client';

import { useEffect, useRef } from 'react';

function playVibeGaming() {
    // ── Layer 1: Speech synthesis says "VibeGaming" ──
    const utterance = new SpeechSynthesisUtterance('Vibe Gaming');
    utterance.rate = 0.9;
    utterance.pitch = 1.3;
    utterance.volume = 0.9;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
        v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;

    // ── Layer 2: 8-bit accent beeps around the speech ──
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0.25;
    master.connect(ctx.destination);

    const t0 = ctx.currentTime;

    // Leading arpeggio: C5 -> E5 -> G5 (sets the retro mood)
    const leadIn = [
        { freq: 523.25, start: 0, dur: 0.07 },
        { freq: 659.25, start: 0.07, dur: 0.07 },
        { freq: 783.99, start: 0.14, dur: 0.07 },
    ];
    for (const n of leadIn) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = n.freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.6, t0 + n.start);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + n.start + n.dur);
        osc.connect(g).connect(master);
        osc.start(t0 + n.start);
        osc.stop(t0 + n.start + n.dur + 0.01);
    }

    // Start speech after lead-in arpeggio
    const speechDelay = 0.25;
    setTimeout(() => window.speechSynthesis.speak(utterance), speechDelay * 1000);

    // Trailing chime after speech (~1.2s later)
    const tailStart = speechDelay + 1.3;
    const trail = [
        { freq: 783.99, start: 0, dur: 0.06 },
        { freq: 1046.5, start: 0.07, dur: 0.06 },
        { freq: 1318.5, start: 0.14, dur: 0.12 },
    ];
    for (const n of trail) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = n.freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.4, t0 + tailStart + n.start);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + tailStart + n.start + n.dur);
        osc.connect(g).connect(master);
        osc.start(t0 + tailStart + n.start);
        osc.stop(t0 + tailStart + n.start + n.dur + 0.01);
    }

    // Sparkle overlay during speech — rapid high-pitched blips
    const sparkleTimes = [0.3, 0.5, 0.7, 0.9, 1.1];
    for (const st of sparkleTimes) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = 2000 + Math.random() * 1000;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.08, t0 + st);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + st + 0.03);
        osc.connect(g).connect(master);
        osc.start(t0 + st);
        osc.stop(t0 + st + 0.04);
    }
}

export default function RetroAudio() {
    const played = useRef(false);

    useEffect(() => {
        if (played.current) return;
        played.current = true;

        // Ensure voices are loaded (some browsers load them async)
        if (typeof window.speechSynthesis !== 'undefined') {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
        }

        const trigger = () => playVibeGaming();

        try {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') {
                ctx.close();
                const once = () => { trigger(); cleanup(); };
                const cleanup = () => {
                    window.removeEventListener('click', once);
                    window.removeEventListener('keydown', once);
                    window.removeEventListener('touchstart', once);
                };
                window.addEventListener('click', once, { once: true });
                window.addEventListener('keydown', once, { once: true });
                window.addEventListener('touchstart', once, { once: true });
            } else {
                ctx.close();
                trigger();
            }
        } catch {
            const once = () => { trigger(); window.removeEventListener('click', once); };
            window.addEventListener('click', once, { once: true });
        }
    }, []);

    return null;
}
