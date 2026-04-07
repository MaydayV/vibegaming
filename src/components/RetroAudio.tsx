'use client';

import { useEffect, useRef } from 'react';

// ── 8-bit voice saying "VibeGaming" entirely with square waves ──
// No SpeechSynthesis, no sawtooth. Pure NES/GameBoy style.
// Each phoneme is a square-wave oscillator through formant filters.
// Slower tempo for clarity.

type Phoneme = {
    f0: number;       // fundamental Hz (0 = silence/noise only)
    f1: number;       // 1st formant Hz
    f2: number;       // 2nd formant Hz
    f3: number;       // 3rd formant Hz
    amp: number;      // volume 0..1
    noise: number;    // noise amount 0..1 for consonants
};

const timeline: { p: Phoneme; dur: number }[] = [
    // ── Vibe ──
    // V - voiced fricative
    { p: { f0: 140, f1: 250, f2: 800, f3: 2500, amp: 0.7, noise: 0.45 }, dur: 0.12 },
    // aɪ - "eye" diphthong (open → close)
    { p: { f0: 165, f1: 750, f2: 1100, f3: 2600, amp: 1.0, noise: 0 }, dur: 0.22 },
    { p: { f0: 180, f1: 300, f2: 2100, f3: 2800, amp: 0.9, noise: 0 }, dur: 0.14 },
    // b - stop burst
    { p: { f0: 0, f1: 200, f2: 700, f3: 2500, amp: 0.55, noise: 0.8 }, dur: 0.06 },

    // gap
    { p: { f0: 0, f1: 0, f2: 0, f3: 0, amp: 0, noise: 0 }, dur: 0.05 },

    // ── Ga ──
    // ɡ - stop
    { p: { f0: 0, f1: 300, f2: 1500, f3: 3000, amp: 0.5, noise: 0.8 }, dur: 0.06 },
    // eɪ - "ay" diphthong
    { p: { f0: 155, f1: 500, f2: 1800, f3: 2500, amp: 1.0, noise: 0 }, dur: 0.20 },
    { p: { f0: 170, f1: 300, f2: 2200, f3: 2900, amp: 0.75, noise: 0 }, dur: 0.10 },

    // ── ming ──
    // m - nasal
    { p: { f0: 150, f1: 280, f2: 900, f3: 2200, amp: 0.8, noise: 0 }, dur: 0.10 },
    // ɪ - short vowel
    { p: { f0: 160, f1: 400, f2: 2000, f3: 2600, amp: 0.95, noise: 0 }, dur: 0.14 },
    // ŋ - nasal ending
    { p: { f0: 145, f1: 300, f2: 2100, f3: 2700, amp: 0.8, noise: 0 }, dur: 0.18 },
    // ŋ fade
    { p: { f0: 125, f1: 280, f2: 2000, f3: 2500, amp: 0.35, noise: 0 }, dur: 0.12 },
];

// 8-bit jingle tail — all square waves
const jingle = [
    { freq: 523.25, start: 0, dur: 0.10 },     // C5
    { freq: 659.25, start: 0.12, dur: 0.10 },   // E5
    { freq: 783.99, start: 0.24, dur: 0.10 },   // G5
    { freq: 1046.5, start: 0.36, dur: 0.28 },   // C6
    { freq: 783.99, start: 0.66, dur: 0.10 },   // G5
    { freq: 1046.5, start: 0.78, dur: 0.35 },   // C6 hold
];

function playVibeGaming(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);

    let offset = 0.03;

    for (const { p, dur } of timeline) {
        const t0 = ctx.currentTime + offset;

        if (p.amp === 0) {
            offset += dur;
            continue;
        }

        // ── Square wave at f0 ──
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = p.f0 || 140;

        // ── 3 formant bandpass filters ──
        const bp1 = ctx.createBiquadFilter();
        bp1.type = 'bandpass';
        bp1.frequency.value = p.f1;
        bp1.Q.value = 6;

        const bp2 = ctx.createBiquadFilter();
        bp2.type = 'bandpass';
        bp2.frequency.value = p.f2;
        bp2.Q.value = 5;

        const bp3 = ctx.createBiquadFilter();
        bp3.type = 'bandpass';
        bp3.frequency.value = p.f3;
        bp3.Q.value = 4;

        const g1 = ctx.createGain(); g1.gain.value = 0.5;
        const g2 = ctx.createGain(); g2.gain.value = 0.35;
        const g3 = ctx.createGain(); g3.gain.value = 0.2;

        // Envelope
        const env = ctx.createGain();
        env.gain.setValueAtTime(0, t0);
        env.gain.linearRampToValueAtTime(p.amp, t0 + 0.02);
        env.gain.setValueAtTime(p.amp, t0 + dur - 0.025);
        env.gain.linearRampToValueAtTime(0, t0 + dur);

        osc.connect(bp1).connect(g1).connect(env);
        osc.connect(bp2).connect(g2).connect(env);
        osc.connect(bp3).connect(g3).connect(env);
        env.connect(master);

        osc.start(t0);
        osc.stop(t0 + dur + 0.01);

        // ── Noise for consonants ──
        if (p.noise > 0) {
            const bufLen = Math.floor(ctx.sampleRate * dur);
            const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
            const ch = buf.getChannelData(0);
            for (let i = 0; i < bufLen; i++) ch[i] = Math.random() * 2 - 1;
            const noise = ctx.createBufferSource();
            noise.buffer = buf;

            const nBp = ctx.createBiquadFilter();
            nBp.type = 'bandpass';
            nBp.frequency.value = p.f2;
            nBp.Q.value = 2;

            const nGain = ctx.createGain();
            nGain.gain.setValueAtTime(p.noise * p.amp * 0.55, t0);
            nGain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);

            noise.connect(nBp).connect(nGain).connect(master);
            noise.start(t0);
            noise.stop(t0 + dur);
        }

        offset += dur;
    }

    // ── Jingle tail — pure square waves ──
    const tailBase = ctx.currentTime + offset + 0.08;
    for (const n of jingle) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = n.freq;

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.3, tailBase + n.start);
        g.gain.exponentialRampToValueAtTime(0.001, tailBase + n.start + n.dur);

        osc.connect(g).connect(master);
        osc.start(tailBase + n.start);
        osc.stop(tailBase + n.start + n.dur + 0.01);
    }
}

export default function RetroAudio() {
    const played = useRef(false);

    useEffect(() => {
        if (played.current) return;
        played.current = true;

        const trigger = () => {
            const ctx = new AudioContext();
            playVibeGaming(ctx);
        };

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
