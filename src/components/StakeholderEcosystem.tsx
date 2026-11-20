import { useState } from "react";
import { Users, Stethoscope, Cpu, ShieldCheck, Globe, ArrowRightLeft } from "lucide-react";

interface StakeholderNode {
  id: string;
  label: string;
  shortLabel: string;
  subtitle: string;
  icon: typeof Users;
  x: number;
  y: number;
  accent: "gold" | "sage";
  need: string;
  delivers: string;
  captures: string;
  stageFocus: string;
}

const STAKEHOLDERS: StakeholderNode[] = [
  {
    id: "patients",
    label: "Patients & Caregivers",
    shortLabel: "Patients",
    subtitle: "Stroke · ALS · SCI",
    icon: Users,
    x: 200,
    y: 44,
    accent: "gold",
    need: "30–90 min gel-cap setup and high false-positive rates make home BCIs unusable in daily life.",
    delivers: "30–60s silent rest anchor, consumer wearable ergonomics, and motion/arousal-robust intent decoding.",
    captures: "Home autonomy, higher adherence, and lower caregiver burden.",
    stageFocus: "Usability & fatigue tolerance with Prof. Mamede de Carvalho (IMM/FMUL).",
  },
  {
    id: "clinics",
    label: "Clinical & Rehab Centers",
    shortLabel: "Clinics",
    subtitle: "IMM / FMUL · Neurorehab",
    icon: Stethoscope,
    x: 348,
    y: 132,
    accent: "sage",
    need: "Therapist time wasted on impedance checks and per-session recalibration.",
    delivers: "Hardware-agnostic SaMD workflow with rapid baseline anchoring and objective motor-intent telemetry.",
    captures: "B2B SaaS licensing and faster patient throughput per session.",
    stageFocus: "Clinical endpoint alignment (decoder AUC + functional recovery scores).",
  },
  {
    id: "oems",
    label: "EEG & Robotics OEMs",
    shortLabel: "OEMs",
    subtitle: "Headsets · Assistive Arms",
    icon: Cpu,
    x: 306,
    y: 282,
    accent: "gold",
    need: "Dry-electrode and wearable hardware fails outside quiet labs; robotic manipulators need fail-safe confidence gates.",
    delivers: "Drop-in LSL / SDK physiological gating engine that turns noisy wearable streams into reliable triggers.",
    captures: "OEM middleware licensing & per-unit device royalties.",
    stageFocus: "Latency, confidence-gating thresholds, and LSL/ROS interface pilots.",
  },
  {
    id: "regulatory",
    label: "Regulatory & Payors",
    shortLabel: "Payors / MDR",
    subtitle: "EU MDR · Health Systems",
    icon: ShieldCheck,
    x: 94,
    y: 282,
    accent: "sage",
    need: "Reimbursable home tele-rehab evidence and clear Class I vs. Class IIa SaMD safety boundaries.",
    delivers: "Audit-ready LOSO validation, negative controls, and lower per-patient rehabilitation costs.",
    captures: "Reimbursement eligibility and EU MDR market access.",
    stageFocus: "EU MDR software classification & Stage 2 clinical dossier scoping.",
  },
  {
    id: "opensource",
    label: "Open-Science Community",
    shortLabel: "Open Science",
    subtitle: "BIDS · LSL Ecosystem",
    icon: Globe,
    x: 52,
    y: 132,
    accent: "gold",
    need: "Lack of synchronized, anonymized multimodal EEG + peripheral BIDS benchmarks.",
    delivers: "Open LSL acquisition stack (nautilus_bci) and anonymized BIDS benchmark subset.",
    captures: "Independent replication, community adoption, and academic citations.",
    stageFocus: "Dual-stream release: public benchmark subset vs. Stage 2 proprietary corpus.",
  },
];

export default function StakeholderEcosystem() {
  const [selectedId, setSelectedId] = useState<string>("oems");
  const active = STAKEHOLDERS.find((s) => s.id === selectedId) ?? STAKEHOLDERS[0];
  const ActiveIcon = active.icon;

  return (
    <div className="rounded-2xl border border-frost/10 bg-graphite/40 p-6 md:p-10 mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-frost/10 mb-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-2">
            Translational Ecosystem · Value Map
          </div>
          <h3 className="font-serif text-2xl md:text-4xl text-cream tracking-[-0.02em]">
            Stakeholder &amp; Value-Flow Graph
          </h3>
          <p className="text-frost/60 text-sm mt-1.5 max-w-2xl">
            Select any node around the LUPIN SaMD core to inspect clinical needs, value delivered, and Stage 1–2 validation priorities.
          </p>
        </div>
        <span className="font-mono text-[11px] text-frost/45 inline-flex items-center gap-1.5">
          <ArrowRightLeft size={13} className="text-gold" /> Interactive Ecosystem
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: SVG Hub-and-Spoke Graph */}
        <div className="lg:col-span-6 rounded-xl border border-frost/10 bg-ink/80 p-4">
          <svg viewBox="0 0 400 330" className="w-full h-auto">
            {/* Spokes */}
            {STAKEHOLDERS.map((node) => {
              const isSelected = node.id === active.id;
              const strokeColor = node.accent === "gold" ? "#c2a45d" : "#4a7c6f";
              return (
                <line
                  key={`spoke-${node.id}`}
                  x1={200}
                  y1={174}
                  x2={node.x}
                  y2={node.y}
                  stroke={strokeColor}
                  strokeWidth={isSelected ? 2.5 : 1.2}
                  strokeDasharray={isSelected ? undefined : "4 4"}
                  opacity={isSelected ? 0.9 : 0.35}
                />
              );
            })}

            {/* Center Hub */}
            <g>
              <circle cx={200} cy={174} r={46} fill="#17191f" stroke="#c2a45d" strokeWidth={2} />
              <circle cx={200} cy={174} r={52} fill="none" stroke="#c2a45d" strokeWidth={0.8} opacity={0.3} />
              <text
                x={200}
                y={169}
                textAnchor="middle"
                fill="#f5f1e8"
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
              >
                LUPIN
              </text>
              <text
                x={200}
                y={184}
                textAnchor="middle"
                fill="#c2a45d"
                fontSize="8.5"
                fontFamily="JetBrains Mono, monospace"
              >
                SaMD CORE
              </text>
            </g>

            {/* Stakeholder Nodes */}
            {STAKEHOLDERS.map((node) => {
              const isSelected = node.id === active.id;
              const strokeColor = node.accent === "gold" ? "#c2a45d" : "#4a7c6f";
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  className="cursor-pointer"
                >
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={34}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={1.2}
                      opacity={0.45}
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={28}
                    fill={isSelected ? "#23262f" : "#15171d"}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 2.2 : 1.2}
                  />
                  <text
                    x={node.x}
                    y={node.y + 3}
                    textAnchor="middle"
                    fill="#f5f1e8"
                    fontSize="9"
                    fontWeight={isSelected ? "700" : "500"}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {node.shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Selected Stakeholder Detail Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {STAKEHOLDERS.map((node) => {
              const isSelected = node.id === active.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedId(node.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs border transition-colors ${
                    isSelected
                      ? "border-gold bg-gold/20 text-gold"
                      : "border-frost/10 bg-ink/60 text-frost/65 hover:text-cream"
                  }`}
                >
                  {node.shortLabel}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-frost/10 bg-ink/80 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-stone p-2.5 text-gold">
                <ActiveIcon size={20} />
              </div>
              <div>
                <h4 className="font-serif text-2xl text-cream leading-tight">{active.label}</h4>
                <div className="font-mono text-xs text-frost/50">{active.subtitle}</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-stone/35 border border-frost/10 p-3.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-oxblood mb-1.5">
                  Unmet Need / Friction
                </div>
                <p className="text-frost/75 leading-relaxed">{active.need}</p>
              </div>
              <div className="rounded-lg bg-stone/35 border border-frost/10 p-3.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage mb-1.5">
                  Value LUPIN Delivers
                </div>
                <p className="text-frost/75 leading-relaxed">{active.delivers}</p>
              </div>
            </div>

            <div className="rounded-lg bg-stone/25 border border-frost/10 p-3.5 text-xs space-y-2">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">
                  Value Captured:{" "}
                </span>
                <span className="text-frost/80">{active.captures}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage">
                  Validation Priority:{" "}
                </span>
                <span className="text-frost/70">{active.stageFocus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
