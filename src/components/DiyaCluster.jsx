const LAMPS = [40, 100, 160, 220, 280];

export default function DiyaCluster() {
  return (
    <svg
      className="diya-cluster"
      viewBox="0 0 320 120"
      role="img"
      aria-label="Five glowing oil lamps"
    >
      <defs>
        <linearGradient id="diyaBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7d27a" />
          <stop offset="45%" stopColor="#d99a2b" />
          <stop offset="100%" stopColor="#8a5a12" />
        </linearGradient>
        <radialGradient id="diyaGlow">
          <stop offset="0%" stopColor="#ffd77a" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#ffb52e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff9d00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff6d2" />
          <stop offset="55%" stopColor="#ffcf5c" />
          <stop offset="100%" stopColor="#ff8a00" />
        </linearGradient>
      </defs>

      {LAMPS.map((x, i) => (
        <g key={x} transform={`translate(${x} 84)`}>
          <circle
            className="flame-glow"
            cx="0"
            cy="-16"
            r="30"
            fill="url(#diyaGlow)"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <path
            className="flame"
            d="M0 -34 C9 -20 9 -8 0 0 C-9 -8 -9 -20 0 -34 Z"
            fill="url(#flameGrad)"
            style={{ animationDelay: `${i * 0.28}s` }}
          />
          <ellipse cx="0" cy="0" rx="21" ry="5" fill="#3a1f10" />
          <path d="M-19 0 C-17 15 17 15 19 0 Z" fill="url(#diyaBody)" />
          <ellipse cx="0" cy="0" rx="19" ry="4.5" fill="#6b3d17" opacity="0.55" />
          <path d="M0 -2 L0 3" stroke="#2a160b" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
