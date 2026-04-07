'use client';

import { useEffect, useRef } from 'react';

// ── 8-bit vocal synthesis for "VibeGaming" ──
// Uses overlapping square/saw oscillators routed through resonant filters
// tuned to formant frequencies for each phoneme, with aggressive gain
// to produce a clear chip-tune "singing" voice.

type Phoneme = {
    f0: number;     // fundamental pitch Hz
    f1: number;     // 1st formant
    f2: number;     // 2nd formant
    f3: number;     // 3rd formant
    amp: number;    // amplitude 0..1
    noise: number;  // noise mix 0..1 for fricatives
    type: 'vowel' | 'fric' | 'stop' | 'nasal';
};

// Formant data for each phoneme in "Vibe Gaming"
// V=voiced fricative, aɪ=diphthong, b=stop, ɡ=stop, eɪ=diphthong, m=nasal, ɪ=short vowel, ŋ=nasal
const PHONEMES: { phoneme: Phoneme; dur: number; label: string }[] = [
    // ── Vibe ──
    // V (voiced fricative)
    { phoneme: { f0: 150, f1: 250, f2: 800, f3: 2500, amp: 0.7, noise: 0.5, type: 'fric' }, dur: 0.08, label: 'v' },
    // aɪ start (open vowel)
    { phoneme: { f0: 170, f1: 750, f2: 1100, f3: 2600, amp: 0.95, noise: 0, type: 'vowel' }, dur: 0.14, label: 'a' },
    // aɪ end (close vowel glide)
    { phoneme: { f0: 185, f1: 300, f2: 2100, f3: 2800, amp: 0.85, noise: 0, type: 'vowel' }, dur: 0.10, label: 'ɪ' },
    // b (stop with release)
    { phoneme: { f0: 150, f1: 200, f2: 700, f3: 2500, amp: 0.6, noise: 0.7, type: 'stop' }, dur: 0.05, label: 'b' },

    // ── gap ──
    { phoneme: { f0: 0, f1: 0, f2: 0, f3: 0, amp: 0, noise: 0, type: 'stop' }, dur: 0.03, label: '_' },

    // ── Ga ──
    // ɡ (stop burst)
    { phoneme: { f0: 0, f1: 300, f2: 1500, f3: 3000, amp: 0.5, noise: 0.8, type: 'stop' }, dur: 0.04, label: 'g' },
    // eɪ start (mid vowel)
    { phoneme: { f0: 165, f1: 500, f2: 1800, f3: 2500, amp: 0.95, noise: 0, type: 'vowel' }, dur: 0.13, label: 'e' },
    // eɪ end (glide to i)
    { phoneme: { f0: 180, f1: 300, f2: 2200, f3: 2900, amp: 0.7, noise: 0, type: 'vowel' }, dur: 0.07, label: 'i' },

    // ── ming ──
    // m (nasal)
    { phoneme: { f0: 155, f1: 280, f2: 900, f3: 2200, amp: 0.75, noise: 0, type: 'nasal' }, dur: 0.07, label: 'm' },
    // ɪ (short vowel)
    { phoneme: { f0: 165, f1: 400, f2: 2000, f3: 2600, amp: 0.9, noise: 0, type: 'vowel' }, dur: 0.10, label: 'ɪ' },
    // ŋ (nasal ending)
    { phoneme: { f0: 150, f1: 300, f2: 2100, f3: 2700, amp: 0.75, noise: 0, type: 'nasal' }, dur: 0.12, label: 'ŋ' },
    // trailing off
    { phoneme: { f0: 130, f1: 280, f2: 2000, f3: 2500, amp: 0.4, noise: 0, type: 'nasal' }, dur: 0.08, label: 'ŋ~' },
];

function playVibeGaming(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);

    let offset = 0.02; // tiny leading silence

    for (const { phoneme: p, dur } of PHONEMES) {
        const t0 = ctx.currentTime + offset;

        if (p.amp === 0) {
            offset += dur;
            continue;
        }

        // ── Oscillator layer 1: sawtooth at f0 (rich harmonic source) ──
        const saw = ctx.createOscillator();
        saw.type = 'sawtooth';
        saw.frequency.value = p.f0 || 150;

        // ── Oscillator layer 2: square one octave up (8-bit grit) ──
        const sq = ctx.createOscillator();
        sq.type = 'square';
        sq.frequency.value = (p.f0 || 150) * 2;

        // ── Formant filter 1 ──
        const bp1 = ctx.createBiquadFilter();
        bp1.type = 'bandpass';
        bp1.frequency.value = p.f1;
        bp1.Q.value = 6;

        // ── Formant filter 2 ──
        const bp2 = ctx.createBiquadFilter();
        bp2.type = 'bandpass';
        bp2.frequency.value = p.f2;
        bp2.Q.value = 5;

        // ── Formant filter 3 ──
        const bp3 = ctx.createBiquadFilter();
        bp3.type = 'bandpass';
        bp3.frequency.value = p.f3;
        bp3.Q.value = 4;

        // Mix gains for formant blend
        const g1 = ctx.createGain(); g1.gain.value = 0.55;
        const g2 = ctx.createGain(); g2.gain.value = 0.35;
        const g3 = ctx.createGain(); g3.gain.value = 0.15;

        // Master phoneme envelope
        const env = ctx.createGain();
        env.gain.setValueAtTime(0, t0);
        env.gain.linearRampToValueAtTime(p.amp, t0 + 0.015);
        env.gain.setValueAtTime(p.amp, t0 + dur - 0.02);
        env.gain.linearRampToValueAtTime(0, t0 + dur);

        // Route saw through formants
        saw.connect(bp1).connect(g1).connect(env);
        saw.connect(bp2).connect(g2).connect(env);
        saw.connect(bp3).connect(g3).connect(env);

        // Route square (softer, adds 8-bit character)
        const sqGain = ctx.createGain();
        sqGain.gain.value = 0.2;
        sq.connect(sqGain).connect(env);

        env.connect(master);

        saw.start(t0);
        saw.stop(t0 + dur + 0.01);
        sq.start(t0);
        sq.stop(t0 + dur + 0.01);

        // ── Noise for fricatives/stops ──
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
            nGain.gain.setValueAtTime(p.noise * p.amp * 0.6, t0);
            nGain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);

            noise.connect(nBp).connect(nGain).connect(master);
            noise.start(t0);
            noise.stop(t0 + dur);
        }

        offset += dur;
    }

    // ── 8-bit jingle tail ──
    const tail = offset + 0.06;
    const jingle = [
        { freq: 783.99, dur: 0.06 },
        { freq: 987.77, dur: 0.06 },
        { freq: 1318.5, dur: 0.18 },
    ];
    let jt = 0;
    for (const n of jingle) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = n.freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.35, ctx.currentTime + tail + jt);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tail + jt + n.dur);
        osc.connect(g).connect(master);
        osc.start(ctx.currentTime + tail + jt);
        osc.stop(ctx.currentTime + tail + jt + n.dur + 0.01);
        jt += n.dur + 0.01;
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
