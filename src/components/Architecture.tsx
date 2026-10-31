import { useState } from "react";
import { BrainCircuit, AlignCenter, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

const pillars = [
  {
    id: "rq1",
    icon: BrainCircuit,
    tag: "Engine 01",
    title: "Noise Becomes Signal",
    productName: "Multimodal Gating",
    desc: "Heartbeats, eye blinks, sweat — the artifacts that poison conventional BCIs — instead steer the decoder. One fusion engine reads EEG together with GSR, HRV, gaze and thermal data, and decides which neural signal to trust, moment by moment.",
  },
  {
    id: "rq2",
    icon: AlignCenter,
    tag: "Engine 02",
    title: "Works Inside a Life in Motion",
    productName: "Activity-Aware Manifold Alignment",
    desc: "Most BCIs only survive in a still, silent lab. LUPIN tracks body movement with IMUs to know whether a patient is imagining a motion or actually making one — so the system stays accurate while patients walk, reach and live.",
  },
  {
    id: "rq3",
    icon: Sparkles,
    tag: "Engine 03",
    title: "Lab Intelligence, Consumer Hardware",
    productName: "Generative LUPI Distillation",
    desc: "Trained with a full hospital-grade sensor stack, deployed on a sub-€300 consumer headset. The teacher brain we build in the lab hands its knowledge to a lightweight student on the patient's head — no recalibration, ever.",
  },
];

export default function Architecture() {
  const [open, setOpen] = useState<string | null>("rq3");

  return (
    <section id="architecture" className="relative bg-graphite py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">System Architecture</h2>
          <p className="text-frost/70 text-lg leading-relaxed">One decoding engine, three breakthroughs — each one removes a wall between the lab and the living room.</p>
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
                    <div className="text-frost/50 text-sm mt-1 font-mono">{p.productName}</div>
                  </div>
                  <div className="ml-auto mt-1 text-frost/40">{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-7 pb-7 pt-2 border-t border-frost/10">
                    <p className="text-frost/80 leading-relaxed mb-6">{p.desc.split("*").join("")}</p>
                    {/* Lab-vs-Home switch for Engine 03 */}
                    {p.id === "rq3" && (
                      <div className="rounded-xl bg-ink border border-frost/10 p-5">
                        <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-3">From Our Lab to Their Living Room</h4>
                        <div className="flex gap-4 text-sm flex-col sm:flex-row">
                          <div className="flex-1 rounded-lg bg-stone/60 p-3 border border-frost/10">
                            <div className="text-xs font-mono text-frost/50 mb-1">IN THE LAB (TEACHER)</div>
                            <div className="text-cream font-medium">Full clinical sensor stack</div>
                            <div className="text-frost/60 text-xs mt-1">Dense EEG + fNIRS + 5 peripheral modalities</div>
                          </div>
                          <div className="flex-1 rounded-lg bg-stone/60 p-3 border border-frost/10">
                            <div className="text-xs font-mono text-frost/50 mb-1">AT HOME (STUDENT)</div>
                            <div className="text-cream font-medium">4-channel headset + watch</div>
                            <div className="text-frost/60 text-xs mt-1">Zero calibration; real-time intent prediction</div>
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
