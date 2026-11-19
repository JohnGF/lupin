import { useState } from "react";
import { Activity, ShieldAlert, ShieldCheck, SlidersHorizontal } from "lucide-react";

const REST_POINTS = [
  { x: 58, y: 122 },
  { x: 74, y: 146 },
  { x: 88, y: 112 },
  { x: 102, y: 138 },
  { x: 66, y: 96 },
  { x: 114, y: 156 },
  { x: 92, y: 162 },
];

const INTENT_POINTS = [
  { x: 184, y: 58 },
  { x: 206, y: 74 },
  { x: 192, y: 94 },
  { x: 222, y: 62 },
  { x: 214, y: 104 },
  { x: 174, y: 76 },
  { x: 230, y: 88 },
];

const PRESETS = [
  { label: "Still Lab", gsr: 10, imu: 5 },
  { label: "GSR Spike", gsr: 85, imu: 15 },
  { label: "Head Motion", gsr: 20, imu: 90 },
  { label: "Real-World", gsr: 75, imu: 80 },
];

export default function NoiseAsContextDemo() {
  const [gsr, setGsr] = useState(20);
  const [imu, setImu] = useState(15);

  const confound = Math.min(1, (gsr * 0.48 + imu * 0.52) / 100);
  // Standard BCI boundary shifts & tilts toward Rest cluster under confound
  const stdShiftX = -confound * 48;
  const stdTilt = confound * 26;
  // LUPIN boundary stays anchored with minimal residual jitter
  const lupinShiftX = -confound * 4;
  const lupinTilt = confound * 2;

  const eegTrustPct = Math.round(92 - confound * 42);
  const auxGatePct = Math.round(12 + confound * 76);

  const driftLabel =
    confound < 0.25 ? "Minimal" : confound < 0.6 ? "Moderate Drift" : "Severe False-Positive Drift";

  return (
    <div className="mt-12 rounded-2xl border border-frost/10 bg-graphite/50 p-6 md:p-10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-frost/10">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-2">
            Illustrative Paradigm Simulator · Engine 01
          </div>
          <h3 className="font-serif text-2xl md:text-4xl text-cream tracking-[-0.02em]">
            &ldquo;Noise as Context&rdquo; — Cross-Attention Gating
          </h3>
          <p className="text-frost/60 text-sm mt-2 max-w-2xl">
            Inject autonomic arousal (GSR) or head motion (IMU) to compare how a standard unimodal decoder drifts versus LUPIN&apos;s physiological gating.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => {
            const active = gsr === p.gsr && imu === p.imu;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setGsr(p.gsr);
                  setImu(p.imu);
                }}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs border transition-colors ${
                  active
                    ? "border-gold bg-gold/20 text-gold"
                    : "border-frost/10 bg-stone/50 text-frost/70 hover:text-cream hover:border-frost/25"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confound Sliders */}
      <div className="grid md:grid-cols-2 gap-6 py-6 border-b border-frost/10">
        <label className="block rounded-xl border border-frost/10 bg-ink/70 p-4">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="inline-flex items-center gap-2 text-frost/80 uppercase tracking-[0.1em]">
              <Activity size={14} className="text-gold" /> Cognitive Load / GSR Surge
            </span>
            <span className="text-gold">{gsr}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={gsr}
            onChange={(e) => setGsr(Number(e.target.value))}
            className="w-full accent-[#c2a45d] cursor-pointer"
          />
        </label>

        <label className="block rounded-xl border border-frost/10 bg-ink/70 p-4">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="inline-flex items-center gap-2 text-frost/80 uppercase tracking-[0.1em]">
              <SlidersHorizontal size={14} className="text-sage" /> Head Motion / IMU Displacement
            </span>
            <span className="text-sage">{imu}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={imu}
            onChange={(e) => setImu(Number(e.target.value))}
            className="w-full accent-[#4a7c6f] cursor-pointer"
          />
        </label>
      </div>

      {/* Side-by-side Comparison */}
      <div className="grid lg:grid-cols-2 gap-6 pt-8">
        {/* Left: Standard BCI */}
        <div className="rounded-xl border border-oxblood/40 bg-ink/80 p-5 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="text-oxblood" />
              <h4 className="font-serif text-xl text-cream">Standard Unimodal BCI</h4>
            </div>
            <span className="rounded-full bg-oxblood/15 border border-oxblood/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-oxblood">
              {driftLabel}
            </span>
          </div>

          <svg viewBox="0 0 280 200" className="w-full h-auto rounded-lg bg-[#111318] border border-frost/5">
            <text x="14" y="20" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono, monospace">
              LATENT DECISION SPACE (EEG ONLY)
            </text>

            {/* Rest cluster */}
            {REST_POINTS.map((pt, idx) => {
              const cx = pt.x + confound * ((idx % 3) - 1) * 14;
              const cy = pt.y - confound * ((idx % 2) * 10);
              return (
                <circle
                  key={`std-r-${idx}`}
                  cx={cx}
                  cy={cy}
                  r="5.5"
                  fill="#94a3b8"
                  opacity="0.75"
                />
              );
            })}

            {/* Intent cluster */}
            {INTENT_POINTS.map((pt, idx) => (
              <circle
                key={`std-i-${idx}`}
                cx={pt.x - confound * 8}
                cy={pt.y + confound * 8}
                r="5.5"
                fill="#c2a45d"
                opacity="0.9"
              />
            ))}

            {/* Wavering decision boundary */}
            <line
              x1={142 + stdShiftX - stdTilt}
              y1="30"
              x2={142 + stdShiftX + stdTilt}
              y2="185"
              stroke="#8c3a3a"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
            <text x="20" y="186" fill="#94a3b8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              IDLE / REST
            </text>
            <text x="195" y="186" fill="#c2a45d" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              MOTOR INTENT
            </text>
          </svg>

          <p className="text-frost/65 text-xs leading-relaxed mt-4">
            Without physiological context, EMG/motion spikes and autonomic drift leak directly into the EEG feature space, pulling the decision boundary into the resting state.
          </p>
        </div>

        {/* Right: LUPIN Cross-Attention Gating */}
        <div className="rounded-xl border border-sage/40 bg-ink/80 p-5 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-sage" />
              <h4 className="font-serif text-xl text-cream">LUPIN Cross-Attention Gating</h4>
            </div>
            <span className="rounded-full bg-sage/15 border border-sage/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-sage">
              Boundary Locked
            </span>
          </div>

          <svg viewBox="0 0 280 200" className="w-full h-auto rounded-lg bg-[#111318] border border-frost/5">
            <text x="14" y="20" fill="#4a7c6f" fontSize="9" fontFamily="JetBrains Mono, monospace">
              CONTEXT-GATED MANIFOLD (EEG + GSR/IMU)
            </text>

            {/* Rest cluster (stays separated) */}
            {REST_POINTS.map((pt, idx) => (
              <circle
                key={`lup-r-${idx}`}
                cx={pt.x}
                cy={pt.y}
                r="5.5"
                fill="#94a3b8"
                opacity="0.75"
              />
            ))}

            {/* Intent cluster */}
            {INTENT_POINTS.map((pt, idx) => (
              <circle
                key={`lup-i-${idx}`}
                cx={pt.x}
                cy={pt.y}
                r="5.5"
                fill="#c2a45d"
                opacity="0.9"
              />
            ))}

            {/* Stabilized decision boundary */}
            <line
              x1={142 + lupinShiftX - lupinTilt}
              y1="30"
              x2={142 + lupinShiftX + lupinTilt}
              y2="185"
              stroke="#4a7c6f"
              strokeWidth="2.8"
            />
            <text x="20" y="186" fill="#94a3b8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              IDLE / REST
            </text>
            <text x="195" y="186" fill="#c2a45d" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              MOTOR INTENT
            </text>
          </svg>

          {/* Live cross-attention weight bars */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] font-mono">
            <div className="rounded-lg bg-stone/40 border border-frost/10 px-3 py-2">
              <div className="flex justify-between text-frost/70 mb-1">
                <span>Raw EEG Weight</span>
                <span className="text-gold">{eegTrustPct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink overflow-hidden">
                <div className="h-full bg-gold transition-all" style={{ width: `${eegTrustPct}%` }} />
              </div>
            </div>
            <div className="rounded-lg bg-stone/40 border border-frost/10 px-3 py-2">
              <div className="flex justify-between text-frost/70 mb-1">
                <span>Context Gate (GSR/IMU)</span>
                <span className="text-sage">{auxGatePct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink overflow-hidden">
                <div className="h-full bg-sage transition-all" style={{ width: `${auxGatePct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-[11px] font-mono text-frost/45">
        <span>CONCEPTUAL SIMULATION — ILLUSTRATES CROSS-ATTENTION CONDITIONING HYPOTHESIS</span>
        <span>NOT EMPIRICAL TRIAL DATA</span>
      </div>
    </div>
  );
}
