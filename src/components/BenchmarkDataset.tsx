import { ShieldCheck, Terminal } from "lucide-react";

const badges = ["EEG", "EMG", "EOG", "PPG", "Respiration", "GSR", "Accelerometry"];

export default function BenchmarkDataset() {
  return (
    <section id="dataset" className="relative bg-graphite py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">Open Science &amp; Benchmark Dataset</h2>
          <p className="text-frost/70 text-lg leading-relaxed">BIDS-compliant, multi-site, leave-one-subject-out validated — released for reproducible clinical neuroscience.</p>
        </div>

        <div className="rounded-2xl border border-frost/10 bg-ink overflow-hidden shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-6 py-4 bg-stone/60 border-b border-frost/10">
            <div className="w-3 h-3 rounded-full bg-oxblood" />
            <div className="w-3 h-3 rounded-full bg-gold" />
            <div className="w-3 h-3 rounded-full bg-sage" />
            <span className="ml-4 font-mono text-xs text-frost/60">lu pin-dataset-bids-v1.0.tgz — open-science-release</span>
            <Terminal size={14} className="ml-auto text-frost/40" />
          </div>

          <div className="p-6 md:p-10 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <dl className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="rounded-xl bg-stone/40 border border-frost/10 p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-2">Sessions</dt>
                  <dd className="font-serif text-3xl text-cream">420</dd>
                  <dd className="text-frost/50 text-xs mt-1">Multi-session, multi-site recordings</dd>
                </div>
                <div className="rounded-xl bg-stone/40 border border-frost/10 p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-2">Subjects</dt>
                  <dd className="font-serif text-3xl text-cream">30</dd>
                  <dd className="text-frost/50 text-xs mt-1">Healthy + clinical cohorts</dd>
                </div>
                <div className="rounded-xl bg-stone/40 border border-frost/10 p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-2">Modalities</dt>
                  <dd className="font-serif text-3xl text-cream">7</dd>
                  <dd className="text-frost/50 text-xs mt-1">Full multimodal stack per session</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span key={b} className="rounded-full bg-stone/60 border border-frost/10 px-3 py-1 text-xs font-mono text-frost/80">{b}</span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-ink border border-frost/10 p-6">
              <div className="flex items-center gap-2 mb-4"><ShieldCheck size={18} className="text-sage" /> <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-sage">Validation Rigor</h4></div>
              <p className="text-frost/80 leading-relaxed text-sm mb-4">Leave-One-Subject-Out (LOSO) cross-validation across all 30 subjects — ensuring generalization to unseen patients, not just unseen sessions.</p>
              <div className="flex items-center gap-3 text-xs font-mono text-frost/50"><span className="rounded bg-stone px-2 py-0.5">LOSO</span><span className="rounded bg-stone px-2 py-0.5">BIDS</span><span className="rounded bg-stone px-2 py-0.5">REPRODUCIBLE</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
