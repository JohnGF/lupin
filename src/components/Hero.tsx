import { ArrowRight, Waves } from "lucide-react";
import SignalReframingGraphic from "./SignalReframingGraphic";

export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-ink text-cream">
      {/* Subtle radial glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-gold/10 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-sage/10 blur-[100px] -z-10" />

      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.15em] text-gold mb-8">
          <Waves size={14} strokeWidth={2} />
          CAIXAIMPULSE HEALTH INNOVATION // LASIGE &amp; IMM
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-[-0.03em] text-cream mb-8">
              LUPIN{" "}
              <span className="italic text-gold">—</span>{" "}
              <span className="block text-gold">Learning User</span>
              <span className="block">Physiological Intent</span>
              <span className="block text-frost/60">Networks</span>
            </h1>

            <p className="text-xl md:text-2xl font-light leading-relaxed text-frost/90 mb-4 max-w-2xl">
              Reframing physiological signals from artifact-prone BCI inputs into predictive intent — through multimodal gating, manifold alignment, and generative LUPI distillation.
            </p>
            <p className="text-base md:text-lg text-frost/60 leading-relaxed mb-10 max-w-2xl">
              LUPIN abandons the legacy lab pipeline — training-serving skew, artifact fallacy, calibration burden — and replaces it with a single, robust, patient-accessible paradigm for assistive neuroscience.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#architecture" className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-7 py-3.5 text-sm font-semibold tracking-tight hover:bg-cream transition-colors shadow-[0_0_0_1px_rgba(194,164,93,0.3)]">
                Explore Architecture <ArrowRight size={16} />
              </a>
              <a href="#clinical" className="inline-flex items-center gap-2 rounded-full border border-frost/20 text-cream px-7 py-3.5 text-sm font-medium tracking-tight hover:border-gold hover:text-gold transition-colors">
                Clinical Impact
              </a>
              <a href="#dataset" className="inline-flex items-center gap-2 rounded-full border border-frost/20 text-cream px-7 py-3.5 text-sm font-medium tracking-tight hover:border-gold hover:text-gold transition-colors">
                Open Benchmark
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-frost/10 bg-graphite/60 p-4 md:p-6 shadow-2xl backdrop-blur-xl">
              <SignalReframingGraphic />
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-frost/50">
                <span>RQ1 · RQ2 · RQ3</span>
                <span>SCHEMATIC — NOT TO SCALE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
