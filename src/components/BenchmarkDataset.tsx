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
                  <dd className="font-serif text-3xl text-cream">???</dd>
                  <dd className="text-frost/50 text-xs mt-1">Multi-session, multi-site recordings</dd>
                </div>
                <div className="rounded-xl bg-stone/40 border border-frost/10 p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-2">Subjects</dt>
                  <dd className="font-serif text-3xl text-cream">???</dd>
                  <dd className="text-frost/50 text-xs mt-1">Healthy + clinical cohorts</dd>
                </div>
                <div className="rounded-xl bg-stone/40 border border-frost/10 p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-2">Modalities</dt>
                  <dd className="font-serif text-3xl text-cream">???</dd>
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
              <p className="text-frost/80 leading-relaxed text-sm mb-4">Leave-One-Subject-Out (LOSO) cross-validation across all subjects — ensuring generalization to unseen patients, not just unseen sessions.</p>
              <div className="flex items-center gap-3 text-xs font-mono text-frost/50"><span className="rounded bg-stone px-2 py-0.5">LOSO</span><span className="rounded bg-stone px-2 py-0.5">BIDS</span><span className="rounded bg-stone px-2 py-0.5">REPRODUCIBLE</span></div>
            </div>
          </div>

          {/* Open-source ecosystem strip */}
          <div className="px-6 md:px-10 pb-8 md:pb-10">
            <div className="rounded-xl bg-stone/30 border border-frost/10 p-5 md:p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-gold">Open-Source BCI Ecosystem — Built in the Open</h4>
                <span className="font-mono text-[10px] text-frost/40">github.com/JohnGF</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {[
                  { name: "nautilus_bci", desc: "Nautilus BCI software stack", url: "https://github.com/JohnGF/nautilus_bci" },
                  { name: "bci_workshop", desc: "BCI & advanced HCI workshop", url: "https://github.com/JohnGF/bci_workshop" },
                  { name: "galaxy_watch_lsl", desc: "Wearable IMU/PPG → LSL streaming", url: "https://github.com/JohnGF/galaxy_watch_lsl" },
                  { name: "hikmicro-lsl", desc: "Thermal imaging → LSL pipeline", url: "https://github.com/JohnGF/hikmicro-lsl" },
                ].map((r) => (
                  <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                     className="group rounded-lg bg-ink border border-frost/10 px-3 py-3 hover:border-gold/40 transition-colors">
                    <div className="font-mono text-cream group-hover:text-gold transition-colors">{r.name} ↗</div>
                    <div className="text-frost/50 mt-1">{r.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
