'use client';

import { useEffect, useRef } from 'react';

// ── "VibeGaming" speech synthesis using Web Audio square-wave formants ──
// Each syllable is modeled as a time slice with a fundamental frequency (pitch)
// and one or two formant frequencies (vowel resonances) mixed via bandpass filters.

type Segment = {
    start: number;    // seconds from start
    dur: number;      // duration in seconds
    f0: number;       // fundamental (pitch)
    f1: number;       // 1st formant (vowel quality)
    f2: number;       // 2nd formant (vowel quality)
    gain: number;     // volume 0-1
    voiced: boolean;  // true = vowel/voiced consonant, false = noise burst
};

// "Vibe-Ga-ming"  (vaɪb ɡeɪ mɪŋ)
// Approximated with formant transitions for each phoneme
function buildSegments(): Segment[] {
    let t = 0;
    const s: Segment[] = [];

    // ── V ── (voiced fricative, short)
    s.push({ start: t, dur: 0.06, f0: 150, f1: 250, f2: 1200, gain: 0.25, voiced: true }); t += 0.06;

    // ── aɪ ── "Vye"
    s.push({ start: t, dur: 0.12, f0: 180, f1: 700, f2: 1200, gain: 0.5, voiced: true }); t += 0.12;
    s.push({ start: t, dur: 0.08, f0: 190, f1: 350, f2: 2100, gain: 0.45, voiced: true }); t += 0.08;

    // ── b ── (stop, brief)
    s.push({ start: t, dur: 0.04, f0: 0, f1: 200, f2: 800, gain: 0.3, voiced: false }); t += 0.04;

    // ── tiny gap
    t += 0.02;

    // ── ɡ ── (stop burst)
    s.push({ start: t, dur: 0.04, f0: 0, f1: 300, f2: 1500, gain: 0.25, voiced: false }); t += 0.04;

    // ── eɪ ── "Gay"
    s.push({ start: t, dur: 0.14, f0: 175, f1: 500, f2: 1900, gain: 0.5, voiced: true }); t += 0.14;
    s.push({ start: t, dur: 0.06, f0: 185, f1: 300, f2: 2300, gain: 0.35, voiced: true }); t += 0.06;

    // ── m ── (nasal onset of "ming")
    s.push({ start: t, dur: 0.06, f0: 160, f1: 250, f2: 1200, gain: 0.35, voiced: true }); t += 0.06;

    // ── ɪ ── "ih"
    s.push({ start: t, dur: 0.10, f0: 170, f1: 400, f2: 2000, gain: 0.45, voiced: true }); t += 0.10;

    // ── ŋ ── "ng" (nasal ending, pitch slides down)
    s.push({ start: t, dur: 0.16, f0: 150, f1: 280, f2: 2300, gain: 0.35, voiced: true }); t += 0.16;
    s.push({ start: t, dur: 0.10, f0: 130, f1: 250, f2: 2100, gain: 0.15, voiced: true }); t += 0.10;

    return s;
}

function playVibeGaming(ctx: AudioContext) {
    const segments = buildSegments();
    const totalDur = segments[segments.length - 1].start + segments[segments.length - 1].dur;

    const master = ctx.createGain();
    master.gain.value = 0.4;
    master.connect(ctx.destination);

    for (const seg of segments) {
        const t0 = ctx.currentTime + seg.start;

        if (seg.voiced) {
            // Sawtooth gives a buzzy retro voice-like tone
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(seg.f0, t0);

            // Formant filters to shape vowel quality
            const bp1 = ctx.createBiquadFilter();
            bp1.type = 'bandpass';
            bp1.frequency.setValueAtTime(seg.f1, t0);
            bp1.Q.value = 4;

            const bp2 = ctx.createBiquadFilter();
            bp2.type = 'bandpass';
            bp2.frequency.setValueAtTime(seg.f2, t0);
            bp2.Q.value = 3;

            const g1 = ctx.createGain();
            const g2 = ctx.createGain();
            g1.gain.value = 0.6;
            g2.gain.value = 0.4;

            const mix = ctx.createGain();
            mix.gain.setValueAtTime(0, t0);
            mix.gain.linearRampToValueAtTime(seg.gain, t0 + 0.02);
            mix.gain.setValueAtTime(seg.gain, t0 + seg.dur - 0.03);
            mix.gain.linearRampToValueAtTime(0, t0 + seg.dur);

            osc.connect(bp1).connect(g1).connect(mix);
            osc.connect(bp2).connect(g2).connect(mix);
            mix.connect(master);

            osc.start(t0);
            osc.stop(t0 + seg.dur + 0.01);
        } else {
            // Noise burst for unvoiced consonants (b, ɡ)
            const bufLen = Math.floor(ctx.sampleRate * seg.dur);
            const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < bufLen; i++) {
                data[i] = (Math.random() * 2 - 1) * 0.3;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buf;

            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = seg.f2;
            bp.Q.value = 2;

            const g = ctx.createGain();
            g.gain.setValueAtTime(seg.gain, t0);
            g.gain.exponentialRampToValueAtTime(0.001, t0 + seg.dur);

            noise.connect(bp).connect(g).connect(master);
            noise.start(t0);
            noise.stop(t0 + seg.dur);
        }
    }

    // ── Trailing chime (two quick beeps, classic 8-bit jingle) ──
    const tailStart = totalDur + 0.05;
    const chimeNotes = [
        { freq: 783.99, t: 0, dur: 0.08 },
        { freq: 1046.5, t: 0.09, dur: 0.18 },
    ];
    for (const n of chimeNotes) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = n.freq;

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.25, ctx.currentTime + tailStart + n.t);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tailStart + n.t + n.dur);

        osc.connect(g).connect(master);
        osc.start(ctx.currentTime + tailStart + n.t);
        osc.stop(ctx.currentTime + tailStart + n.t + n.dur + 0.02);
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

        const tryPlay = () => {
            try {
                const ctx = new AudioContext();
                if (ctx.state === 'suspended') {
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
                    playVibeGaming(ctx);
                }
            } catch {
                const once = () => { trigger(); window.removeEventListener('click', once); };
                window.addEventListener('click', once, { once: true });
            }
        };

        tryPlay();
    }, []);

    return null;
}
