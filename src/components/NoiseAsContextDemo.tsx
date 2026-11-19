import { useEffect, useState } from "react";
import { Activity, Play, Pause, RotateCcw, ShieldAlert, ShieldCheck, SlidersHorizontal, Zap } from "lucide-react";

const REST_POINTS = [
  { x: 56, y: 120 },
  { x: 72, y: 146 },
  { x: 86, y: 110 },
  { x: 100, y: 136 },
  { x: 64, y: 94 },
  { x: 112, y: 156 },
  { x: 90, y: 162 },
  { x: 78, y: 128 },
];

const INTENT_POINTS = [
  { x: 188, y: 58 },
  { x: 208, y: 74 },
  { x: 194, y: 96 },
  { x: 224, y: 62 },
  { x: 216, y: 106 },
  { x: 176, y: 78 },
  { x: 232, y: 88 },
  { x: 202, y: 84 },
];

const PRESETS = [
  { label: "Still Lab", gsr: 10, imu: 5 },
  { label: "GSR Spike", gsr: 85, imu: 15 },
  { label: "Head Motion", gsr: 20, imu: 90 },
  { label: "Real-World", gsr: 75, imu: 80 },
];

interface StreamSample {
  t: number;
  trueIntent: boolean;
  artifact: number;
  stdProb: number;
  lupinProb: number;
}

const HISTORY_LEN = 48;

function makeInitialHistory(): StreamSample[] {
  return Array.from({ length: HISTORY_LEN }, (_, i) => ({
    t: i,
    trueIntent: false,
    artifact: 0.1,
    stdProb: 0.18 + Math.sin(i * 0.4) * 0.04,
    lupinProb: 0.16 + Math.sin(i * 0.4) * 0.03,
  }));
}

export default function NoiseAsContextDemo() {
  const [gsr, setGsr] = useState(25);
  const [imu, setImu] = useState(20);
  const [playing, setPlaying] = useState(true);
  const [intentPulse, setIntentPulse] = useState(0);
  const [burstPulse, setBurstPulse] = useState(0);
  const [history, setHistory] = useState<StreamSample[]>(makeInitialHistory);

  const effectiveGsr = Math.min(100, gsr + burstPulse * 55);
  const effectiveImu = Math.min(100, imu + burstPulse * 65);
  const confound = Math.min(1, (effectiveGsr * 0.48 + effectiveImu * 0.52) / 100);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setIntentPulse((p) => (p > 0 ? Math.max(0, p - 1) : 0));
      setBurstPulse((b) => (b > 0 ? Math.max(0, b - 0.12) : 0));

      setHistory((prev) => {
        const lastT = prev[prev.length - 1]?.t ?? 0;
        const nextT = lastT + 1;
        const autoIntent = nextT % 32 >= 20 && nextT % 32 <= 25;
        const isIntent = intentPulse > 0 || autoIntent;

        const baseNoise = Math.sin(nextT * 0.55) * 0.06 + Math.cos(nextT * 0.9) * 0.04;
        const artifactAmp = Math.min(1, confound * (0.75 + 0.25 * Math.sin(nextT * 0.7)));

        const stdRaw = isIntent
          ? 0.78 + baseNoise - artifactAmp * 0.22
          : 0.16 + baseNoise + artifactAmp * 0.62;
        const lupinRaw = isIntent
          ? 0.84 + baseNoise * 0.6 - artifactAmp * 0.04
          : 0.15 + baseNoise * 0.5 + artifactAmp * 0.09;

        const nextSample: StreamSample = {
          t: nextT,
          trueIntent: isIntent,
          artifact: artifactAmp,
          stdProb: Math.max(0.03, Math.min(0.98, stdRaw)),
          lupinProb: Math.max(0.03, Math.min(0.98, lupinRaw)),
        };
        return [...prev.slice(1), nextSample];
      });
    }, 140);
    return () => window.clearInterval(id);
  }, [playing, confound, intentPulse]);

  // Decision boundary geometry in latent 2D space
  const stdShiftX = -confound * 52;
  const stdTilt = confound * 28;
  const lupinShiftX = -confound * 4;
  const lupinTilt = confound * 2;

  const boundaryXAtY = (y: number, shiftX: number, tilt: number) => {
    const t = (y - 30) / (185 - 30);
    return 142 + shiftX - tilt + 2 * tilt * t;
  };

  const stdRestMapped = REST_POINTS.map((pt, idx) => {
    const cx = pt.x + confound * ((idx % 3) * 18 + 8);
    const cy = pt.y - confound * ((idx % 2) * 14 + 4);
    const bx = boundaryXAtY(cy, stdShiftX, stdTilt);
    return { cx, cy, misclassified: cx > bx };
  });
  const stdFalsePositives = stdRestMapped.filter((p) => p.misclassified).length;

  const stdIntentMapped = INTENT_POINTS.map((pt) => {
    const cx = pt.x - confound * 14;
    const cy = pt.y + confound * 12;
    const bx = boundaryXAtY(cy, stdShiftX, stdTilt);
    return { cx, cy, missed: cx < bx };
  });

  const stdFprPct = Math.round((stdFalsePositives / REST_POINTS.length) * 100);
  const lupinFprPct = confound > 0.75 ? 0 : 0;

  const eegTrustPct = Math.round(92 - confound * 42);
  const auxGatePct = Math.round(12 + confound * 76);

  const driftLabel =
    confound < 0.25 ? "Minimal" : confound < 0.6 ? "Moderate Drift" : "Severe False-Positive Drift";

  const latest = history[history.length - 1];
  const stdThreshold = 0.55;

  const toPolyline = (vals: number[], height: number, width: number) =>
    vals
      .map((v, i) => {
        const x = (i / (vals.length - 1)) * width;
        const y = height - v * (height - 12) - 6;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <div className="mt-12 rounded-2xl border border-frost/10 bg-graphite/50 p-6 md:p-10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-8 border-b border-frost/10">
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

        {/* Presets + Stream Controls */}
        <div className="flex flex-wrap items-center gap-2">
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
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="rounded-lg px-2.5 py-1.5 font-mono text-xs border border-frost/15 bg-ink/80 text-frost/80 hover:text-cream inline-flex items-center gap-1.5"
            aria-label={playing ? "Pause stream" : "Play stream"}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setGsr(25);
              setImu(20);
              setBurstPulse(0);
              setIntentPulse(0);
              setHistory(makeInitialHistory());
            }}
            className="rounded-lg p-1.5 border border-frost/15 bg-ink/80 text-frost/70 hover:text-cream"
            aria-label="Reset simulator"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Confound Sliders + Event Triggers */}
      <div className="grid lg:grid-cols-12 gap-4 py-6 border-b border-frost/10 items-stretch">
        <label className="lg:col-span-4 block rounded-xl border border-frost/10 bg-ink/70 p-4">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="inline-flex items-center gap-2 text-frost/80 uppercase tracking-[0.1em]">
              <Activity size={14} className="text-gold" /> GSR Arousal Surge
            </span>
            <span className="text-gold">{Math.round(effectiveGsr)}%</span>
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

        <label className="lg:col-span-4 block rounded-xl border border-frost/10 bg-ink/70 p-4">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="inline-flex items-center gap-2 text-frost/80 uppercase tracking-[0.1em]">
              <SlidersHorizontal size={14} className="text-sage" /> IMU Head Motion
            </span>
            <span className="text-sage">{Math.round(effectiveImu)}%</span>
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

        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setBurstPulse(1)}
            className="rounded-xl border border-oxblood/40 bg-oxblood/10 hover:bg-oxblood/20 px-3 py-3 text-left transition-colors flex flex-col justify-between"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-oxblood flex items-center gap-1.5">
              <Zap size={12} /> Inject Confound
            </span>
            <span className="text-xs text-cream font-medium mt-1">Simulate Motion + GSR Burst</span>
          </button>
          <button
            type="button"
            onClick={() => setIntentPulse(8)}
            className="rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 px-3 py-3 text-left transition-colors flex flex-col justify-between"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold flex items-center gap-1.5">
              <Activity size={12} /> Motor Cue
            </span>
            <span className="text-xs text-cream font-medium mt-1">Trigger True Intent Epoch</span>
          </button>
        </div>
      </div>

      {/* Side-by-side Latent Manifold Comparison */}
      <div className="grid lg:grid-cols-2 gap-6 pt-8">
        {/* Left: Standard BCI */}
        <div className="rounded-xl border border-oxblood/40 bg-ink/80 p-5 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="text-oxblood" />
              <h4 className="font-serif text-xl text-cream">Standard Unimodal BCI</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-frost/60">FPR: <strong className={stdFprPct > 0 ? "text-oxblood" : "text-cream"}>{stdFprPct}%</strong></span>
              <span className="rounded-full bg-oxblood/15 border border-oxblood/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-oxblood">
                {driftLabel}
              </span>
            </div>
          </div>

          <svg viewBox="0 0 280 200" className="w-full h-auto rounded-lg bg-[#111318] border border-frost/5">
            <text x="14" y="20" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono, monospace">
              LATENT DECISION SPACE (EEG ONLY)
            </text>

            {/* Cluster density ellipses */}
            <ellipse cx={82 + confound * 14} cy={130 - confound * 8} rx={38} ry={34} fill="#94a3b8" opacity="0.08" />
            <ellipse cx={204 - confound * 12} cy={78 + confound * 10} rx={36} ry={32} fill="#c2a45d" opacity="0.08" />

            {/* Rest cluster */}
            {stdRestMapped.map((pt, idx) => (
              <g key={`std-r-${idx}`}>
                {pt.misclassified && (
                  <circle cx={pt.cx} cy={pt.cy} r="9" fill="none" stroke="#8c3a3a" strokeWidth="1.2" opacity="0.85" />
                )}
                <circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r="5.2"
                  fill={pt.misclassified ? "#c94a4a" : "#94a3b8"}
                  opacity="0.85"
                />
              </g>
            ))}

            {/* Intent cluster */}
            {stdIntentMapped.map((pt, idx) => (
              <circle
                key={`std-i-${idx}`}
                cx={pt.cx}
                cy={pt.cy}
                r="5.2"
                fill={pt.missed ? "#94a3b8" : "#c2a45d"}
                opacity="0.9"
              />
            ))}

            {/* Wavering decision boundary */}
            <line
              x1={142 + stdShiftX - stdTilt}
              y1="30"
              x2={142 + stdShiftX + stdTilt}
              y2="185"
              stroke="#c94a4a"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
            <text x="16" y="186" fill="#94a3b8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              IDLE / REST
            </text>
            <text x="195" y="186" fill="#c2a45d" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              MOTOR INTENT
            </text>
          </svg>

          <p className="text-frost/65 text-xs leading-relaxed mt-4">
            Without physiological context, EMG/motion spikes and autonomic drift leak into the EEG feature space, pushing idle samples across the boundary (highlighted in red).
          </p>
        </div>

        {/* Right: LUPIN Cross-Attention Gating */}
        <div className="rounded-xl border border-sage/40 bg-ink/80 p-5 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-sage" />
              <h4 className="font-serif text-xl text-cream">LUPIN Cross-Attention Gating</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-frost/60">FPR: <strong className="text-sage">{lupinFprPct}%</strong></span>
              <span className="rounded-full bg-sage/15 border border-sage/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-sage">
                Boundary Locked
              </span>
            </div>
          </div>

          <svg viewBox="0 0 280 200" className="w-full h-auto rounded-lg bg-[#111318] border border-frost/5">
            <text x="14" y="20" fill="#4a7c6f" fontSize="9" fontFamily="JetBrains Mono, monospace">
              CONTEXT-GATED MANIFOLD (EEG + GSR/IMU)
            </text>

            {/* Stabilized cluster ellipses */}
            <ellipse cx={82} cy={130} rx={36} ry={32} fill="#94a3b8" opacity="0.08" />
            <ellipse cx={204} cy={78} rx={36} ry={32} fill="#c2a45d" opacity="0.1" />

            {/* Rest cluster with subtle gating anchors */}
            {REST_POINTS.map((pt, idx) => (
              <g key={`lup-r-${idx}`}>
                {confound > 0.25 && (
                  <circle cx={pt.x} cy={pt.y} r="8" fill="none" stroke="#4a7c6f" strokeWidth="0.9" opacity={confound * 0.55} />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5.2"
                  fill="#94a3b8"
                  opacity="0.82"
                />
              </g>
            ))}

            {/* Intent cluster */}
            {INTENT_POINTS.map((pt, idx) => (
              <circle
                key={`lup-i-${idx}`}
                cx={pt.x}
                cy={pt.y}
                r="5.2"
                fill="#c2a45d"
                opacity="0.92"
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
            <text x="16" y="186" fill="#94a3b8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
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

      {/* Live Scrolling Decoder Posterior Stream */}
      <div className="mt-6 rounded-xl border border-frost/10 bg-ink/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-frost/80">
            Live Decoder Posterior Stream <span className="text-frost/40">(P(Intent | t))</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1.5 text-frost/70">
              <span className="w-2.5 h-2.5 rounded-sm bg-gold/30 border border-gold/60 inline-block" /> True Intent Cue
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#e06c6c]">
              <span className="w-3 h-0.5 bg-[#c94a4a] inline-block" /> Unimodal ({Math.round((latest?.stdProb ?? 0) * 100)}%)
            </span>
            <span className="inline-flex items-center gap-1.5 text-sage">
              <span className="w-3 h-0.5 bg-[#4a7c6f] inline-block" /> LUPIN Gated ({Math.round((latest?.lupinProb ?? 0) * 100)}%)
            </span>
          </div>
        </div>

        <svg viewBox="0 0 640 110" className="w-full h-28 rounded-lg bg-[#111318] border border-frost/5">
          {/* True intent windows */}
          {history.map((s, i) => {
            if (!s.trueIntent) return null;
            const x = (i / (history.length - 1)) * 640;
            const w = 640 / (history.length - 1) + 1;
            return <rect key={`cue-${s.t}`} x={x - w / 2} y={0} width={w} height={110} fill="#c2a45d" opacity="0.14" />;
          })}

          {/* Decision threshold line */}
          <line
            x1="0"
            y1={110 - stdThreshold * (110 - 12) - 6}
            x2="640"
            y2={110 - stdThreshold * (110 - 12) - 6}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.45"
          />
          <text x="8" y={110 - stdThreshold * (110 - 12) - 10} fill="#94a3b8" fontSize="8.5" fontFamily="JetBrains Mono, monospace" opacity="0.7">
            TRIGGER THRESHOLD (0.55)
          </text>

          {/* Standard unimodal trace */}
          <polyline
            fill="none"
            stroke="#c94a4a"
            strokeWidth="2"
            points={toPolyline(history.map((h) => h.stdProb), 110, 640)}
          />

          {/* LUPIN gated trace */}
          <polyline
            fill="none"
            stroke="#4a7c6f"
            strokeWidth="2.4"
            points={toPolyline(history.map((h) => h.lupinProb), 110, 640)}
          />
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-frost/45">
        <span>CONCEPTUAL SIMULATION — ILLUSTRATES CROSS-ATTENTION CONDITIONING HYPOTHESIS</span>
        <span>NOT EMPIRICAL TRIAL DATA</span>
      </div>
    </div>
  );
}
