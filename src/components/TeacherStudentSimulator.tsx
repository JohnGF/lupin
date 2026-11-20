import { useState } from "react";
import { Cpu, Watch, Radio, Sparkles, ArrowRight } from "lucide-react";

type Tier = "teacher" | "student";

interface Electrode {
  id: string;
  x: number;
  y: number;
  studentPhysical?: boolean;
  motorTarget?: boolean;
}

const ELECTRODES: Electrode[] = [
  { id: "Fp1", x: 148, y: 78 },
  { id: "Fp2", x: 212, y: 78 },
  { id: "AF7", x: 112, y: 98, studentPhysical: true },
  { id: "AF8", x: 248, y: 98, studentPhysical: true },
  { id: "F7", x: 96, y: 124, studentPhysical: true },
  { id: "F3", x: 138, y: 118, studentPhysical: true },
  { id: "Fz", x: 180, y: 114 },
  { id: "F4", x: 222, y: 118, studentPhysical: true },
  { id: "F8", x: 264, y: 124, studentPhysical: true },
  { id: "FC5", x: 110, y: 146, studentPhysical: true },
  { id: "FC1", x: 156, y: 142 },
  { id: "FC2", x: 204, y: 142 },
  { id: "FC6", x: 250, y: 146, studentPhysical: true },
  { id: "T7", x: 76, y: 170, studentPhysical: true },
  { id: "C3", x: 126, y: 170, motorTarget: true },
  { id: "Cz", x: 180, y: 170, motorTarget: true },
  { id: "C4", x: 234, y: 170, motorTarget: true },
  { id: "T8", x: 284, y: 170, studentPhysical: true },
  { id: "TP9", x: 64, y: 198 },
  { id: "TP10", x: 296, y: 198 },
  { id: "CP5", x: 108, y: 198 },
  { id: "CP1", x: 156, y: 198 },
  { id: "CP2", x: 204, y: 198 },
  { id: "CP6", x: 252, y: 198 },
  { id: "P7", x: 98, y: 226, studentPhysical: true },
  { id: "P3", x: 138, y: 224 },
  { id: "Pz", x: 180, y: 226 },
  { id: "P4", x: 222, y: 224 },
  { id: "P8", x: 262, y: 226, studentPhysical: true },
  { id: "PO3", x: 150, y: 248 },
  { id: "PO4", x: 210, y: 248 },
  { id: "O1", x: 154, y: 268, studentPhysical: true },
  { id: "Oz", x: 180, y: 272 },
  { id: "O2", x: 206, y: 268, studentPhysical: true },
];

const FNIRS_OPTODES = [
  { id: "N1", x: 132, y: 95 },
  { id: "N2", x: 162, y: 92 },
  { id: "N3", x: 198, y: 92 },
  { id: "N4", x: 228, y: 95 },
  { id: "N5", x: 118, y: 158 },
  { id: "N6", x: 142, y: 158 },
  { id: "N7", x: 218, y: 158 },
  { id: "N8", x: 242, y: 158 },
];

const AUX_SENSORS = [
  { name: "Galaxy Watch (IMU + PPG)", tier: "both" as const, role: "Motion & cardiac anchor" },
  { name: "Kinect v2 (Gaze + Head Pose)", tier: "teacher" as const, role: "Visual attention & posture" },
  { name: "HIKMICRO (Thermal)", tier: "teacher" as const, role: "Autonomic facial perfusion" },
  { name: "GSR & Respiration", tier: "teacher" as const, role: "Sympathetic arousal state" },
];

export default function TeacherStudentSimulator() {
  const [tier, setTier] = useState<Tier>("teacher");
  const [highlightLatent, setHighlightLatent] = useState(true);

  const isTeacher = tier === "teacher";

  return (
    <div className="mt-12 rounded-2xl border border-frost/10 bg-ink/80 p-6 md:p-10 shadow-2xl">
      {/* Header + Tier Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-frost/10">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-2">
            Interactive Architecture Simulator · LUPI Framework
          </div>
          <h3 className="font-serif text-2xl md:text-4xl text-cream tracking-[-0.02em]">
            Teacher Tier vs. Student Tier
          </h3>
          <p className="text-frost/60 text-sm mt-2 max-w-2xl">
            Switch between the privileged laboratory stack used during training and the consumer wearable stack used at home.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="LUPI deployment tier"
          className="inline-flex rounded-xl bg-stone/70 border border-frost/10 p-1.5 self-start lg:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={isTeacher}
            onClick={() => setTier("teacher")}
            className={`px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-[0.1em] transition-all ${
              isTeacher
                ? "bg-gold text-ink font-semibold shadow-md"
                : "text-frost/70 hover:text-cream"
            }`}
          >
            Lab Mode (Teacher)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isTeacher}
            onClick={() => setTier("student")}
            className={`px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-[0.1em] transition-all ${
              !isTeacher
                ? "bg-sage text-cream font-semibold shadow-md"
                : "text-frost/70 hover:text-cream"
            }`}
          >
            Wearable Mode (Student)
          </button>
        </div>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid lg:grid-cols-12 gap-8 pt-8 items-center">
        {/* Left: Interactive 10-20 + Auxiliary Topology SVG */}
        <div className="lg:col-span-7 rounded-xl border border-frost/10 bg-graphite/60 p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-frost/60">
              {isTeacher ? "32-ch EEG + 8-optode fNIRS + 4 Aux Streams" : "14-ch Consumer EEG (EPOC X) + Watch IMU/PPG → Virtual C3/C4"}
            </span>
            {!isTeacher && (
              <button
                type="button"
                onClick={() => setHighlightLatent((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] border transition-colors ${
                  highlightLatent
                    ? "border-gold/50 bg-gold/15 text-gold"
                    : "border-frost/15 bg-stone/50 text-frost/60"
                }`}
              >
                <Sparkles size={12} />
                {highlightLatent ? "Virtual C3/C4 Links: ON" : "Virtual C3/C4 Links: OFF"}
              </button>
            )}
          </div>

          <svg
            viewBox="0 0 560 330"
            className="w-full h-auto"
            aria-label="LUPIN Teacher vs Student sensor topology diagram"
          >
            {/* Background grid */}
            <rect x="0" y="0" width="560" height="330" rx="10" fill="#111318" />

            {/* Scalp outline (10-20 top-down) */}
            <polygon points="180,44 168,62 192,62" fill="none" stroke="#333947" strokeWidth="2" />
            <ellipse cx="64" cy="170" rx="8" ry="22" fill="none" stroke="#333947" strokeWidth="2" />
            <ellipse cx="296" cy="170" rx="8" ry="22" fill="none" stroke="#333947" strokeWidth="2" />
            <circle cx="180" cy="170" r="112" fill="#16181f" stroke="#2c313d" strokeWidth="2" />

            {/* Motor cortex band highlight */}
            <rect
              x="104"
              y="153"
              width="152"
              height="34"
              rx="17"
              fill={isTeacher ? "rgba(194,164,93,0.08)" : "rgba(194,164,93,0.12)"}
              stroke={isTeacher ? "rgba(194,164,93,0.25)" : "rgba(194,164,93,0.45)"}
              strokeDasharray={isTeacher ? "none" : "4 4"}
            />

            {/* Latent recovery paths in Student mode */}
            {!isTeacher && highlightLatent && (
              <g className="animate-pulse">
                <path
                  d="M 112 98 Q 108 138 126 170"
                  fill="none"
                  stroke="#c2a45d"
                  strokeWidth="1.8"
                  strokeDasharray="5 4"
                />
                <path
                  d="M 248 98 Q 252 138 234 170"
                  fill="none"
                  stroke="#c2a45d"
                  strokeWidth="1.8"
                  strokeDasharray="5 4"
                />
                <path
                  d="M 112 98 Q 146 130 180 170"
                  fill="none"
                  stroke="#4a7c6f"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 248 98 Q 214 130 180 170"
                  fill="none"
                  stroke="#4a7c6f"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                />
                {/* Watch IMU/PPG anchor path into virtual motor manifold */}
                <path
                  d="M 365 86 Q 305 128 234 170"
                  fill="none"
                  stroke="#4a7c6f"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
              </g>
            )}

            {/* fNIRS optodes (Teacher only) */}
            {FNIRS_OPTODES.map((opt) => (
              <g key={opt.id} opacity={isTeacher ? 0.95 : 0.1}>
                <rect
                  x={opt.x - 4}
                  y={opt.y - 4}
                  width="8"
                  height="8"
                  rx="2"
                  fill="#4a7c6f"
                  stroke="#e8e4db"
                  strokeWidth="0.6"
                />
              </g>
            ))}

            {/* 32-ch EEG electrodes */}
            {ELECTRODES.map((el) => {
              const isPhysical = isTeacher || Boolean(el.studentPhysical);
              const isVirtualMotor = !isTeacher && Boolean(el.motorTarget);

              let fill = "#232733";
              let stroke = "#4b5563";
              let opacity = 0.16;
              let dash: string | undefined;

              if (isPhysical) {
                fill = el.studentPhysical && !isTeacher ? "#4a7c6f" : "#c2a45d";
                stroke = "#e8e4db";
                opacity = 1;
              } else if (isVirtualMotor) {
                fill = "#16181f";
                stroke = "#c2a45d";
                opacity = 1;
                dash = "3 2";
              }

              return (
                <g key={el.id} opacity={opacity}>
                  <circle
                    cx={el.x}
                    cy={el.y}
                    r={el.motorTarget || el.studentPhysical ? 10 : 7.5}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isVirtualMotor ? 1.8 : 1.1}
                    strokeDasharray={dash}
                  />
                  <text
                    x={el.x}
                    y={el.y + 3}
                    textAnchor="middle"
                    fill={isPhysical ? "#111318" : "#c2a45d"}
                    fontSize={el.motorTarget || el.studentPhysical ? "7.5" : "6.5"}
                    fontWeight="600"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {el.id}
                  </text>
                </g>
              );
            })}

            {/* Right panel: Peripheral LSL streams */}
            <text
              x="365"
              y="48"
              fill="#c2a45d"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.08em"
            >
              AUXILIARY LSL STREAMS
            </text>

            {AUX_SENSORS.map((sensor, idx) => {
              const active = isTeacher || sensor.tier === "both";
              const y = 66 + idx * 54;
              return (
                <g key={sensor.name} opacity={active ? 1 : 0.25}>
                  <rect
                    x="365"
                    y={y}
                    width="175"
                    height="42"
                    rx="7"
                    fill={active ? "#1a1d26" : "#13151b"}
                    stroke={sensor.tier === "both" ? "#4a7c6f" : active ? "#c2a45d" : "#2c313d"}
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="381"
                    cy={y + 21}
                    r="4.5"
                    fill={sensor.tier === "both" ? "#4a7c6f" : active ? "#c2a45d" : "#4b5563"}
                  />
                  <text
                    x="394"
                    y={y + 18}
                    fill="#e8e4db"
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="Instrument Sans, sans-serif"
                  >
                    {sensor.name}
                  </text>
                  <text
                    x="394"
                    y={y + 31}
                    fill="#94a3b8"
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {active ? sensor.role : "Teacher training only"}
                  </text>
                </g>
              );
            })}

            {/* Legend */}
            <g transform="translate(24, 304)">
              <circle cx="6" cy="0" r="5" fill={isTeacher ? "#c2a45d" : "#4a7c6f"} />
              <text x="16" y="3" fill="#cbd5e1" fontSize="9" fontFamily="JetBrains Mono, monospace">
                Active Physical Channel
              </text>

              <rect x="168" y="-4" width="8" height="8" rx="2" fill="#4a7c6f" opacity={isTeacher ? 1 : 0.3} />
              <text x="182" y="3" fill="#cbd5e1" fontSize="9" fontFamily="JetBrains Mono, monospace">
                fNIRS Optode
              </text>

              <circle cx="282" cy="0" r="5" fill="#16181f" stroke="#c2a45d" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="292" y="3" fill="#c2a45d" fontSize="9" fontFamily="JetBrains Mono, monospace">
                Virtual C3/Cz/C4 (Latent)
              </text>
            </g>
          </svg>
        </div>

        {/* Right: Technical Breakdown */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border border-frost/10 bg-stone/40 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              {isTeacher ? <Cpu size={18} className="text-gold" /> : <Watch size={18} className="text-sage" />}
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-gold">
                {isTeacher ? "Privileged Information (Training)" : "Distilled Inference (Deployment)"}
              </span>
            </div>
            <h4 className="font-serif text-2xl text-cream mb-2">
              {isTeacher ? "Full Clinical & Autonomic Stack" : "Consumer Wearable Subset"}
            </h4>
            <p className="text-frost/75 text-sm leading-relaxed">
              {isTeacher
                ? "In the lab, LUPIN records dense 32-channel g.Nautilus EEG over sensorimotor cortex (C3, Cz, C4), 8-optode fNIRS hemodynamics, thermal imaging, gaze, and autonomic signals. This builds a rich multimodal motor-intent representation."
                : "At home, the patient wears a comfier 14-channel consumer headset (e.g. Emotiv EPOC X) and a Galaxy Watch (IMU + PPG). The distilled Student model maps this sparser montage onto the Teacher's motor-aligned latent space."}
            </p>
          </div>

          <div className="rounded-xl border border-frost/10 bg-stone/30 p-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-frost/60">
              <Radio size={14} className={isTeacher ? "text-gold" : "text-sage"} />
              <span>{isTeacher ? "Teacher Hardware Stack" : "Virtual C3/C4 Recovery Flow"}</span>
            </div>

            {isTeacher ? (
              <ul className="space-y-2.5 text-sm text-frost/80">
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} className="text-gold shrink-0 mt-1" />
                  <span><strong>EEG:</strong> 32-ch g.Nautilus (full 10-20 scalp + motor cortex)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} className="text-gold shrink-0 mt-1" />
                  <span><strong>fNIRS:</strong> 8-optode cortical hemodynamics (g.Sensor / Artinis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} className="text-gold shrink-0 mt-1" />
                  <span><strong>Auxiliary:</strong> HIKMICRO thermal, Kinect v2 gaze, Galaxy Watch IMU/PPG, GSR</span>
                </li>
              </ul>
            ) : (
              <ol className="space-y-2.5 text-sm text-frost/80">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs text-sage mt-0.5">01</span>
                  <span><strong>Frontal EEG (AF7/AF8/TP9/TP10):</strong> Captures prefrontal/temporal oscillations without central scalp gel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs text-sage mt-0.5">02</span>
                  <span><strong>Watch IMU + PPG:</strong> Anchors posture, micro-movement, and autonomic state over LSL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs text-gold mt-0.5">03</span>
                  <span><strong>Latent Alignment:</strong> Student projects into the Teacher-distilled motor manifold (Virtual C3/Cz/C4).</span>
                </li>
              </ol>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-frost/45 px-1">
            <span>CONCEPTUAL SIMULATOR · LUPIN-PLATFORM HARDWARE</span>
            <span>{isTeacher ? "TIER 1 · LAB" : "TIER 2 · HOME"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
