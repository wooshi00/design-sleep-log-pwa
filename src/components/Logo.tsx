export function Logo() {
  return (
    <div className="relative">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_20px_rgba(157,127,245,0.6)]"
      >
        {/* Outer glow */}
        <circle cx="24" cy="24" r="20" fill="url(#glow)" opacity="0.3" />
        
        {/* Crescent moon */}
        <path
          d="M28 8C18.6 8 11 15.6 11 25C11 34.4 18.6 42 28 42C29.4 42 30.7 41.8 32 41.5C24.8 39.9 19.5 33.4 19.5 25.5C19.5 17.6 24.8 11.1 32 9.5C30.7 8.2 29.4 8 28 8Z"
          fill="url(#moonGradient)"
        />
        
        {/* Subtle highlight */}
        <path
          d="M28 10C27.2 10 26.5 10.1 25.8 10.3C31.5 12.5 35.5 18.2 35.5 25C35.5 31.8 31.5 37.5 25.8 39.7C26.5 39.9 27.2 40 28 40C36.3 40 43 33.3 43 25C43 16.7 36.3 10 28 10Z"
          fill="url(#highlight)"
          opacity="0.4"
        />
        
        <defs>
          <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 24) scale(20)">
            <stop stopColor="#9d7ff5" />
            <stop offset="1" stopColor="#6b46c1" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="moonGradient" x1="11" y1="8" x2="32" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b794f6" />
            <stop offset="0.5" stopColor="#9d7ff5" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          
          <linearGradient id="highlight" x1="25.8" y1="10.3" x2="35.5" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e0d4ff" />
            <stop offset="1" stopColor="#9d7ff5" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
