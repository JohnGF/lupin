import { useState } from "react";
import { BrainCircuit, AlignCenter, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

const pillars = [
  {
    id: "rq1",
    icon: BrainCircuit,
    tag: "RQ1",
    title: "Multimodal Gating",
    desc: "Integrates EEG, EMG, EOG, PPG, respiratory, galvanic skin response, and accelerometry into a single gating mechanism that suppresses artifactual pathways before feature extraction.",
  },
  {
    id: "rq2",
    icon: AlignCenter,
    tag: "RQ2",
    title: "Manifold Alignment",
    desc: "Projects heterogeneous physiological representations onto a common low-dimensional manifold using contrastive alignment — preserving inter-subject variability while reducing calibration demands.",
  },
  {
    id: "rq3",
    icon: Sparkles,
    tag: "RQ3",
    title: "Generative LUPI Distillation",
    desc: "A teacher-student framework where a large multimodal teacher generates privileged intent representations; a lightweight student distills them to near-zero calibration for deployment.",
  },
];

export default function Architecture() {
  const [open, setOpen] = useState<string | null>("rq3");

  return (
    <section id="architecture" className="relative bg-graphite py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">System Architecture</h2>
          <p className="text-frost/70 text-lg leading-relaxed">Three core research questions — each a pillar, each with an interactive phase inspector.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const isOpen = open === p.id;
            const Icon = p.icon;
            return (
              <div key={p.id} className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-gold/40 bg-stone/60 shadow-[0_0_30px_rgba(194,164,93,0.08)]" : "border-frost/10 bg-ink/60"}`}>
                <button onClick={() => setOpen(isOpen ? null : p.id)} className="w-full text-left px-7 py-7 flex items-start gap-4">
                  <div className={`shrink-0 rounded-xl p-3 ${isOpen ? "bg-gold/20 text-gold" : "bg-stone text-frost/60"}`}><Icon size={22} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-1">{p.tag}</div>
                    <h3 className="font-serif text-2xl md:text-3xl text-cream leading-tight">{p.title}</h3>
                  </div>
                  <div className="ml-auto mt-1 text-frost/40">{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-7 pb-7 pt-2 border-t border-frost/10">
                    <p className="text-frost/80 leading-relaxed mb-6">{p.desc}</p>
                    {/* Teacher-Student Phase Inspector */}
                    {p.id === "rq3" && (
                      <div className="rounded-xl bg-ink border border-frost/10 p-5">
                        <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-3">Teacher-Student Phase Inspector</h4>
                        <div className="flex gap-4 text-sm">
                          <div className="flex-1 rounded-lg bg-stone/60 p-3 border border-frost/10">
                            <div className="text-xs font-mono text-frost/50 mb-1">TEACHER (TRAINING)</div>
                            <div className="text-cream font-medium">Multimodal Fusion + LUPI</div>
                            <div className="text-frost/60 text-xs mt-1">Privileged intent labels + full modality stack</div>
                          </div>
                          <div className="flex-1 rounded-lg bg-stone/60 p-3 border border-frost/10">
                            <div className="text-xs font-mono text-frost/50 mb-1">STUDENT (INFERENCE)</div>
                            <div className="text-cream font-medium">Distilled Light Student</div>
                            <div className="text-frost/60 text-xs mt-1">Minimal calibration; real-time intent prediction</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
