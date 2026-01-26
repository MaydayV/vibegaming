import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: '#070A12',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00F5FF',
                    borderRadius: '20%',
                }}
            >
                {/* Simplified Gamepad SVG */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#00F5FF"
                        strokeWidth="2"
                        fill="none"
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
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
