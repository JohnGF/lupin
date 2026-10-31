export default function SignalReframingGraphic() {
  return (
    <svg viewBox="0 0 640 320" className="w-full h-auto drop-shadow-2xl" aria-label="LUPIN signal reframing schematic">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8a7343" /><stop offset="50%" stopColor="#c2a45d" /><stop offset="100%" stopColor="#8a7343" /></linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#c2a45d" floodOpacity="0.35" /></filter>
      </defs>

      {/* Background grid */}
      <rect x="0" y="0" width="640" height="320" fill="#111318" />
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50 + 20} y1="0" x2={i * 50 + 20} y2="320" stroke="#1e2028" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50 + 20} x2="640" y2={i * 50 + 20} stroke="#1e2028" strokeWidth="0.5" />
      ))}

      {/* Legacy noisy input */}
      <path d="M 40 160 Q 70 120 100 160 T 160 160 T 220 140 T 280 160" fill="none" stroke="#8c3a3a" strokeWidth="2.5" opacity="0.6" />
      <text x="30" y="30" fill="#8c3a3a" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="0.08em">LEGACY BCI — ARTIFACT-DRIVEN</text>

      {/* Gating / reframing block */}
      <rect x="280" y="110" width="100" height="60" rx="6" fill="#16181f" stroke="url(#goldGrad)" strokeWidth="1.5" />
      <text x="330" y="140" textAnchor="middle" fill="#c2a45d" fontSize="12" fontWeight="500" fontFamily="Instrument Sans">MULTIMODAL GATE</text>
      <text x="330" y="155" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="JetBrains Mono">RQ1</text>

      {/* Manifold alignment path */}
      <path d="M 380 140 L 460 140" fill="none" stroke="#c2a45d" strokeWidth="2.5" strokeDasharray="6 4" filter="url(#glow)" />
      <polygon points="460,136 470,140 460,144" fill="#c2a45d" />

      {/* Aligned manifold */}
      <path d="M 470 140 Q 520 100 580 140 T 620 140" fill="none" stroke="#4a7c6f" strokeWidth="3" />
      <text x="470" y="100" fill="#4a7c6f" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="0.08em">MANIFOLD ALIGNMENT — RQ2</text>

      {/* Generative LUPI output */}
      <rect x="580" y="110" width="60" height="60" rx="6" fill="#1e2028" stroke="#4a7c6f" strokeWidth="1.5" />
      <text x="610" y="140" textAnchor="middle" fill="#4a7c6f" fontSize="10" fontWeight="500" fontFamily="Instrument Sans">LUPI</text>
      <text x="610" y="152" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontFamily="JetBrains Mono">G — RQ3</text>

      {/* Labels bottom */}
      <text x="40" y="280" fill="#e8e4db" fontSize="14" fontWeight="600" fontFamily="Instrument Sans">PHYSIOLOGICAL SIGNAL</text>
      <text x="280" y="280" fill="#c2a45d" fontSize="14" fontWeight="600" fontFamily="Instrument Sans">INTENT REFRAMING</text>
      <text x="580" y="280" fill="#4a7c6f" fontSize="14" fontWeight="600" fontFamily="Instrument Sans">PREDICTIVE INTENT</text>
    </svg>
  );
}
