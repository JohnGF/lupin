import { GraduationCap, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";

const tracks = [
  {
    id: "metabolic",
    tag: "MSc / Summer Track 01",
    title: "Metabolic Gating & Bio-Hacking",
    modalities: ["EEG", "CGM", "PPG / GSR"],
    desc: "Investigate how glycemic state (sugar rush vs. fasting via continuous glucose monitoring) modulates cortical excitability and motor-imagery decoding.",
  },
  {
    id: "neuroready",
    tag: "MSc / Summer Track 02",
    title: "NEUROREADY Fatigue & Saturation Dashboard",
    modalities: ["HRV", "GSR", "LSL"],
    desc: "Build a real-time readiness and cognitive-saturation dashboard from HRV and GSR streams to trigger adaptive rest or threshold recalibration.",
  },
  {
    id: "vr-gaze",
    tag: "MSc / Summer Track 03",
    title: "Hands-Free VR Controllers",
    modalities: ["Gaze", "EEG", "3D VR"],
    desc: "Combine eye-tracking target selection with EEG motor-intent triggers for low-latency hands-free interaction in 3D virtual environments.",
  },
  {
    id: "grip-force",
    tag: "MSc / Summer Track 04",
    title: "Continuous Grip Force Regression",
    modalities: ["EEG", "Dynamometer", "EMG"],
    desc: "Move beyond discrete classes to continuous motor-force regression using synchronized digital dynamometers and sensorimotor EEG.",
  },
  {
    id: "auditory",
    tag: "MSc / Summer Track 05",
    title: "Auditory Rhythmic Entrainment",
    modalities: ["Audio Priming", "EEG", "LOSO"],
    desc: "Leverage rhythmic auditory cues to stabilize sensorimotor rhythms and rescue decoding performance for BCI non-performers.",
  },
];

export default function StudentProjects() {
  return (
    <section id="students" className="relative bg-graphite border-t border-frost/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-3">
            FCUL · IST · Biomedical Engineering · LASIGE
          </div>
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">
            Student Opportunities &amp; Lab Tracks
          </h2>
          <p className="text-frost/70 text-lg leading-relaxed">
            BSc, MSc thesis, and summer research tracks building open multimodal BCI hardware, real-time LSL pipelines, and clinical decoders.
          </p>
        </div>

        {/* Completed precedent */}
        <div className="mb-10 rounded-2xl border border-sage/35 bg-ink/80 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl bg-sage/15 text-sage p-3 mt-0.5">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-sage mb-1">
                Completed Research Track · Pilot Precedent
              </div>
              <h3 className="font-serif text-2xl text-cream">
                Music as a BCI Paradigm for Action
              </h3>
              <p className="text-frost/70 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Prior MSc / summer research investigating musical and auditory-imagery paradigms for motor/action decoding, with LOSO and brain-switch baselines published in the benchmark hub above.
              </p>
            </div>
          </div>
          <a
            href="#dataset"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-sage/40 bg-sage/10 px-4 py-2.5 font-mono text-xs text-sage hover:bg-sage/20 transition-colors self-start md:self-center"
          >
            View Pilot Benchmarks <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 5 Open Tracks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-frost/10 bg-ink/70 p-7 hover:border-gold/35 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="rounded-lg bg-stone p-2 text-gold">
                  <GraduationCap size={18} />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
                  {t.tag}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-cream mb-3 leading-snug">{t.title}</h3>
              <p className="text-frost/65 text-sm leading-relaxed mb-5 flex-1">{t.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {t.modalities.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-stone/70 border border-frost/10 px-2.5 py-0.5 font-mono text-[11px] text-frost/80"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Join the lab card */}
          <div className="rounded-2xl border border-gold/35 bg-gradient-to-br from-stone/60 to-ink p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-gold mb-3">
                <Sparkles size={15} />
                <span>Apply / Explore the Stack</span>
              </div>
              <h3 className="font-serif text-2xl text-cream mb-3">
                Interested in a Thesis or Summer Project?
              </h3>
              <p className="text-frost/70 text-sm leading-relaxed">
                Start by exploring our open-source workshop and LSL recording suite, then reach out via LASIGE / FCUL.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono">
              <a
                href="https://github.com/JohnGF/bci_workshop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-gold text-ink font-semibold px-3.5 py-2 hover:bg-cream transition-colors"
              >
                bci_workshop ↗
              </a>
              <a
                href="https://github.com/JohnGF/nautilus_bci"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-frost/20 px-3.5 py-2 text-cream hover:border-gold/50 transition-colors"
              >
                nautilus_bci ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
