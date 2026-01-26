import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'VibeGam.ing - AI Game Showcase';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#070A12',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Background Gradients */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '1200px', height: '600px', display: 'flex' }}>
                    <div style={{ width: '600px', height: '600px', background: 'rgba(139, 92, 255, 0.15)', filter: 'blur(100px)', borderRadius: '50%', transform: 'translate(-20%, -20%)' }} />
                    <div style={{ width: '600px', height: '600px', background: 'rgba(0, 245, 255, 0.1)', filter: 'blur(100px)', borderRadius: '50%', transform: 'translate(40%, 20%)' }} />
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                    {/* Large Gamepad Icon */}
                    <svg
                        width="160"
                        height="160"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginBottom: 40 }}
                    >
                        <path
                            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="#00F5FF"
                            strokeWidth="1.5"
                            fill="rgba(0, 245, 255, 0.1)"
                        />
                        <path
                            d="M6 12H10 M8 10V14"
                            stroke="#FF2BD6"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <circle cx="15" cy="12" r="1.5" fill="#2BFF88" />
                        <circle cx="18" cy="12" r="1.5" fill="#FFB020" />
                    </svg>

                    <h1 style={{
                        fontSize: 96,
                        fontWeight: 900,
                        color: '#fff',
                        margin: 0,
                        textShadow: '0 0 40px rgba(0, 245, 255, 0.5)',
                        letterSpacing: '-0.05em'
                    }}>
                        VibeGam.ing
                    </h1>

                    <p style={{
                        fontSize: 32,
                        color: '#aaa',
                        marginTop: 20,
                        maxWidth: 800,
                        textAlign: 'center',
                        lineHeight: 1.4
                    }}>
                        Curated AI Games • Play Instantly • Submit via PR
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
