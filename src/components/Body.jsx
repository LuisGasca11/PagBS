import React, { useState, useMemo } from 'react';

const Body = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleForm = () => {
    window.location.href = '/form';
  };

  const gridRects = useMemo(() => {
    const rects = [];
    for (let i = 0; i < 80; i++) {
      for (let j = 0; j < 25; j++) {
        rects.push(
          <rect
            key={`rect-${i}-${j}`}
            x={-50 + i * 36} 
            y={-20 + j * 36}
            width="35.6"
            height="35.6"
            stroke="#1a1a1a"
            strokeOpacity="0.4"
            strokeWidth="0.6"
            strokeDasharray="2 2"
            fill='none'
          />
        );
      }
    }
    return rects;
  }, []);

  return (
    <section id="inicio" className="flex flex-col items-center text-center relative mx-0 rounded-0 my-0 py-0 px-0 w-screen h-[400px] md:h-[600px] lg:h-[810px] mb-60 md:mb-80 lg:mb-[500px] bg-black">
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <linearGradient
              id="paint0_linear_186_1134"
              x1="35.0676"
              y1="23.6807"
              x2="903.8"
              y2="632.086"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>
            
            <linearGradient
              id="paint1_linear_186_1134"
              x1="1118.08"
              y1="-149.03"
              x2="1118.08"
              y2="1248.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#000000" />
              <stop offset="0.5" stopColor="#52887A" />
              <stop offset="1" stopColor="#8CBCAF" />
            </linearGradient>
            
            <linearGradient
              id="paint2_linear_186_1134"
              x1="1054.08"
              y1="-213.03"
              x2="1054.08"
              y2="1184.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#000000" />
              <stop offset="0.5" stopColor="#52887A" />
              <stop offset="1" stopColor="#8CBCAF" />
            </linearGradient>
            
            <linearGradient
              id="paint3_linear_186_1134"
              x1="1238.08"
              y1="-293.03"
              x2="1238.08"
              y2="1104.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#000000" />
              <stop offset="0.5" stopColor="#52887A" />
              <stop offset="1" stopColor="#8CBCAF" />
            </linearGradient>
            
            <radialGradient
              id="paint4_radial_186_1134"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)"
            >
              <stop stopColor="#000000" />
              <stop offset="0.5" stopColor="#52887A" />
              <stop offset="1" stopColor="#8CBCAF" />
            </radialGradient>

            <mask
              id="mask0_186_1134"
              maskUnits="userSpaceOnUse"
              x="-50"
              y="-20"
              width="2000"
              height="850"
            >
              <rect x="-50" y="-20" width="2000" height="850" fill="url(#paint0_linear_186_1134)" />
            </mask>

            <filter
              id="filter0_f_186_1134"
              x="147.369"
              y="-467.818"
              width="1941.42"
              height="2035.46"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <filter
              id="filter1_f_186_1134"
              x="-554.207"
              y="-1169.39"
              width="3216.57"
              height="3310.61"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="478.182" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <filter
              id="filter2_f_186_1134"
              x="426.762"
              y="-452.424"
              width="1622.63"
              height="1716.67"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="79.6969" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <filter
              id="filter3_f_186_1134"
              x="-253.163"
              y="-611.818"
              width="2221.95"
              height="2035.46"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
            </filter>
          </defs>

          <g mask="url(#mask0_186_1134)">
            {gridRects}
            
            <rect x="699.711" y="81" width="36" height="36" fill="#ffffff" fillOpacity="0.12" />
            <rect x="195.711" y="153" width="36" height="36" fill="#ffffff" fillOpacity="0.13" />
            <rect x="1023.71" y="153" width="36" height="36" fill="#ffffff" fillOpacity="0.13" />
            <rect x="123.711" y="225" width="36" height="36" fill="#ffffff" fillOpacity="0.13" />
            <rect x="1095.71" y="225" width="36" height="36" fill="#ffffff" fillOpacity="0.13" />
            <rect x="951.711" y="297" width="36" height="36" fill="#ffffff" fillOpacity="0.13" />
            <rect x="231.711" y="333" width="36" height="36" fill="#ffffff" fillOpacity="0.10" />
            <rect x="303.711" y="405" width="36" height="36" fill="#ffffff" fillOpacity="0.10" />
            <rect x="87.7109" y="405" width="36" height="36" fill="#ffffff" fillOpacity="0.13" />
            <rect x="519.711" y="405" width="36" height="36" fill="#ffffff" fillOpacity="0.12" />
            <rect x="771.711" y="405" width="36" height="36" fill="#ffffff" fillOpacity="0.13" />
            <rect x="591.711" y="477" width="36" height="36" fill="#ffffff" fillOpacity="0.10" />
            <rect x="-20" y="81" width="36" height="36" fill="#ffffff" fillOpacity="0.09" />
            <rect x="1250" y="153" width="36" height="36" fill="#ffffff" fillOpacity="0.09" />
            <rect x="-40" y="225" width="36" height="36" fill="#ffffff" fillOpacity="0.09" />
            <rect x="1270" y="297" width="36" height="36" fill="#ffffff" fillOpacity="0.09" />
          </g>

          <g filter="url(#filter0_f_186_1134)">
            <path
              d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
              fill="url(#paint1_linear_186_1134)"
            />
          </g>

          <g filter="url(#filter1_f_186_1134)">
            <path
              d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
              fill="url(#paint2_linear_186_1134)"
              fillOpacity="0.69"
            />
          </g>

          <g style={{ mixBlendMode: "lighten" }} filter="url(#filter2_f_186_1134)">
            <path
              d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
              fill="url(#paint3_linear_186_1134)"
            />
          </g>

          <g style={{ mixBlendMode: "overlay" }} filter="url(#filter3_f_186_1134)">
            <path
              d="M65.625 750.269H284.007C860.205 750.269 1327.31 283.168 1327.31 -293.03H1650V1104.85H65.625V750.269Z"
              fill="url(#paint4_radial_186_1134)"
              fillOpacity="0.64"
            />
          </g>

          <rect
            x="0.5"
            y="0.5"
            width="1919"
            height="809"
            rx="0"
            stroke="#888"
            strokeOpacity="0.06"
          />
        </svg>
      </div>

      <div className="relative z-10 space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl mt-16 md:mt-[120px] lg:mt-[160px] px-6">
        <div className="space-y-2">
          <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight">
            <span className="block">Unleash the Power</span>
            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              of AI Agents
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Accelerate your development workflow with intelligent AI agents that write, review, and optimize your code.
        </p>

        <div className="pt-4">
          <button
            onClick={handleForm} 
            className="group bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-white relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="relative z-10 flex items-center justify-center">
              Conoce más
              <svg 
                className={`w-5 h-5 ml-3 transition-transform duration-300 ${
                  isHovered ? 'translate-x-1' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      <div className="relative z-10 space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl mt-16 md:mt-[120px] lg:mt-[160px] px-6 mb-20 md:mb-32 lg:mb-40">
      </div>

      <div className="absolute bottom-[-220px] md:bottom-[-430px] lg:bottom-[-440px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-6xl px-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl border border-gray-700">
          <img 
            alt="AI Dashboard preview" 
            loading="lazy" 
            width="1200"
            height="600"
            decoding="async" 
            className="w-full h-auto rounded-xl shadow-lg"
            src="/code.jpeg"
            style={{ color: 'transparent' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Body;