import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 180,
    height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#070A12',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '18%', // Smooth squircle for iOS
                    border: '4px solid #333',
                }}
            >
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Gamepad Body */}
                    <path
                        d="M2 13C2 17.5 5 21 9 21C11 21 12 20 12 20C12 20 13 21 15 21C19 21 22 17.5 22 13C22 8.5 17.5 6 12 6C6.5 6 2 8.5 2 13Z"
                        fill="#070A12"
                        stroke="#00F5FF"
                        strokeWidth="1.5"
                    />

                    {/* D-Pad */}
                    <path d="M7 11.5H9V14.5H7V11.5Z" fill="#FF2BD6" />
                    <path d="M5.5 13L8 13" stroke="#FF2BD6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 11.5L8 14.5" stroke="#FF2BD6" strokeWidth="2" strokeLinecap="round" />

                    {/* Buttons */}
                    <circle cx="15.5" cy="14" r="1.2" fill="#2BFF88" className="neon-glow" />
                    <circle cx="18" cy="12.5" r="1.2" fill="#FFB020" className="neon-glow" />

                    {/* Decor lines */}
                    <path d="M10 9L14 9" stroke="#8B5CFF" strokeWidth="1" strokeOpacity="0.5" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
