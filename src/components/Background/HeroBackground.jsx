import React from 'react';

const HeroBackground = () => {
  const gridRects = [...Array(35)].flatMap((_, i) => 
    [...Array(22)].map((_, j) => ({
      x: -20.0891 + i * 36,
      y: 9.2 + j * 36,
    }))
  );

  const filledRects = [
    { x: 699.711, y: 81, opacity: 0.15 },
    { x: 195.711, y: 153, opacity: 0.18 },
    { x: 1023.71, y: 153, opacity: 0.18 },
    { x: 123.711, y: 225, opacity: 0.18 },
    { x: 1095.71, y: 225, opacity: 0.18 },
    { x: 951.711, y: 297, opacity: 0.18 },
    { x: 231.711, y: 333, opacity: 0.14 },
    { x: 303.711, y: 405, opacity: 0.14 },
    { x: 87.7109, y: 405, opacity: 0.18 },
    { x: 519.711, y: 405, opacity: 0.15 },
    { x: 771.711, y: 405, opacity: 0.18 },
    { x: 591.711, y: 477, opacity: 0.14 },
  ];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1220 810"
      fill="none"
      xmlns="http://www.w3.org/     2000/svg"
      preserveAspectRatio="none"
      className="w-full h-full block"
      style={{ minHeight: '100%', minWidth: '100%' }}
    >
      <g clipPath="url(#clip0)">
        <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="10" y="-1" width="1200" height="812">
          <rect x="10" y="-0.84668" width="1200" height="811.693" fill="url(#gradient0)" />
        </mask>
        <g mask="url(#mask0)">
          {gridRects.map((rect, i) => (
            <rect
              key={i}
              x={rect.x}
              y={rect.y}
              width="35.6" 
              height="35.6"
              stroke="white"
              strokeOpacity="0.6"
              strokeWidth="0.2"
              strokeDasharray="2 2"
            />
          ))}
          {filledRects.map((rect, i) => (
            <rect key={i} x={rect.x} y={rect.y} width="36" height="36" fill="white" fillOpacity={rect.opacity} />
          ))}
        </g>

        <g filter="url(#blur0)">
          <path
            d="M2400.45 -87.0203V-149.03H3200V1248.85H-800.158V894.269C2000.11 894.269 2400.45 454.931 2400.45 -87.0203Z"
            fill="url(#gradient1)"
          />
        </g>
        <g filter="url(#blur1)">
          <path
            d="M2336.45 -151.02V-213.03H3136V1184.85H-864.158V830.269C1936.11 830.269 2336.45 390.931 2336.45 -151.02Z"
            fill="url(#gradient2)"
            fillOpacity="0.85"
          />
        </g>
        <g style={{ mixBlendMode: "lighten" }} filter="url(#blur2)">
          <path
            d="M2520.45 -231.02V-293.03H3320V1104.85H-680.158V750.269C2120.11 750.269 2520.45 310.931 2520.45 -231.02Z"
            fill="url(#gradient3)"
          />
        </g>
        <g style={{ mixBlendMode: "overlay" }} filter="url(#blur3)">
          <path
            d="M-884.375 750.269H-666.007C-89.795 750.269 377.31 283.168 377.31 -293.03H3100V1104.85H-884.375V750.269Z"
            fill="url(#gradient4)"
            fillOpacity="0.8"
          />
        </g>
      </g>

      <defs>
        {[0, 1, 2, 3].map(i => (
          <filter key={i} id={`blur${i}`} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation={i === 1 ? "478.182" : "159.394"} result="effect1_foregroundBlur" />
          </filter>
        ))}
        <linearGradient id="gradient0" x1="35.0676" y1="23.6807" x2="903.8" y2="632.086" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="gray" />
        </linearGradient>
        {[1, 2, 3].map(i => (
          <linearGradient key={i} id={`gradient${i}`} x1={1118.08 - i * 64} y1={-149.03 - i * 64} x2={1118.08 - i * 64} y2={1248.85 - i * 64} gradientUnits="userSpaceOnUse">
            <stop stopColor="#18181b" />
            <stop offset="0.578125" stopColor="#0a0a0a" />
            <stop offset="1" stopColor="#000000" />
          </linearGradient>
        ))}
        <radialGradient id="gradient4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)">
          <stop stopColor="#18181b" />
          <stop offset="0.157789" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#000000" />
        </radialGradient>
        <clipPath id="clip0">
          <rect width="1220" height="810" rx="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HeroBackground;
