import { useState } from "react";
import { ShieldCheck, Terminal, BarChart3 } from "lucide-react";

const badges = ["EEG", "fNIRS", "EMG", "EOG", "PPG", "GSR", "IMU", "Gaze", "Thermal"];

type BenchmarkTab = "4class" | "l2gate";

const fourClassRows = [
  {
    arch: "Filter Bank CSP (FBCSP + Shrinkage LDA)",
    paradigm: "4 sub-bands spatial filtering",
    sub01: "30.95% ± 9.01%",
    sub02: "25.55% ± 3.19%",
    peak: "42.86%",
    highlight: true,
  },
  {
    arch: "Minimum Distance to Mean (MDM)",
    paradigm: "Riemannian geodesic Fréchet centroid",
    sub01: "23.81% ± 1.68%",
    sub02: "28.36% ± 2.93%",
    peak: "32.35%",
    highlight: true,
  },
  {
    arch: "Hierarchical + Bayesian Accumulation",
    paradigm: "Sequential posterior update",
    sub01: "26.96% ± 7.40%",
    sub02: "24.51% ± 3.56%",
    peak: "36.84%",
  },
  {
    arch: "Hierarchical Confirmed (≥75% Conf)",
    paradigm: "Confidence-gated commitment",
    sub01: "27.84% ± 6.28%",
    sub02: "22.32% ± 5.55%",
    peak: "33.33%",
  },
  {
    arch: "Hierarchical Single-Window",
    paradigm: "FBCSP macro + MDM subtrees",
    sub01: "26.52% ± 6.81%",
    sub02: "26.28% ± 1.61%",
    peak: "35.53%",
  },
  {
    arch: "FBRTS (Multi-band Riemannian)",
    paradigm: "θ, α, β1, β2 tangent space",
    sub01: "21.35% ± 3.48%",
    sub02: "26.56% ± 3.10%",
    peak: "31.11%",
  },
  {
    arch: "Broadband Riemannian",
    paradigm: "OAS covariance (8–30 Hz) + LogReg",
    sub01: "22.14% ± 2.44%",
    sub02: "23.25% ± 7.91%",
    peak: "35.56%",
  },
];

const l2GateRows = [
  {
    subject: "Subject 01 (Classical)",
    auc: "0.57 (0.52–0.60)",
    pval: "p = 0.003–0.220",
    negControl: "0.50 (Chance: 0.50)",
    replay: "16.2% (Peak: 31.2%)",
    latency: "2.61 s",
  },
  {
    subject: "Subject 02 (Modern Pop/Rock)",
    auc: "0.58 (0.45–0.70)",
    pval: "p = 0.001–0.944",
    negControl: "0.50 (Chance: 0.50)",
    replay: "22.5% (Peak: 81.6%)",
    latency: "3.33 s",
  },
];

export default function BenchmarkDataset() {
  const [tab, setTab] = useState<BenchmarkTab>("4class");

  return (
    <section id="dataset" className="relative bg-graphite py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">
            Open Science &amp; Benchmark Hub
          </h2>
          <p className="text-frost/70 text-lg leading-relaxed">
            BIDS-compliant multimodal acquisition, Leave-One-Session-Out (LOSO) baseline benchmarks, and open-source LSL pipelines.
          </p>
        </div>

        <div className="rounded-2xl border border-frost/10 bg-ink overflow-hidden shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-6 py-4 bg-stone/60 border-b border-frost/10">
            <div className="w-3 h-3 rounded-full bg-oxblood" />
            <div className="w-3 h-3 rounded-full bg-gold" />
            <div className="w-3 h-3 rounded-full bg-sage" />
            <span className="ml-4 font-mono text-xs text-frost/60">
              lupin-dataset-bids-v1.0 — pilot-benchmarks &amp; open-science-release
            </span>
            <Terminal size={14} className="ml-auto text-frost/40" />
          </div>

          {/* Corpus KPIs + Validation Rigor */}
          <div className="p-6 md:p-10 grid lg:grid-cols-3 gap-10 border-b border-frost/10">
            <div className="lg:col-span-2">
              <dl className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="rounded-xl bg-stone/40 border border-frost/10 p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-2">
                    Pilot Cohort
                  </dt>
                  <dd className="font-serif text-3xl text-cream">n = 2</dd>
                  <dd className="text-frost/50 text-xs mt-1">
                    Evaluated in pilot benchmarks · Target: N=30
                  </dd>
                </div>
                <div className="rounded-xl bg-stone/40 border border-frost/10 p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-2">
                    BIDS Corpus
                  </dt>
                  <dd className="font-serif text-3xl text-cream">Multi-Session</dd>
                  <dd className="text-frost/50 text-xs mt-1">
                    BIDS multimodal recorder · Target: 420 sessions
                  </dd>
                </div>
                <div className="rounded-xl bg-stone/40 border border-frost/10 p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-2">
                    Modalities
                  </dt>
                  <dd className="font-serif text-3xl text-cream">9 Streams</dd>
                  <dd className="text-frost/50 text-xs mt-1">
                    Synchronized via Lab Streaming Layer (LSL)
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-stone/60 border border-frost/10 px-3 py-1 text-xs font-mono text-frost/80"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-ink border border-frost/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={18} className="text-sage" />
                <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-sage">
                  Validation Rigor
                </h4>
              </div>
              <p className="text-frost/80 leading-relaxed text-sm mb-4">
                Leave-One-Session-Out (LOSO) cross-validation with negative controls (`listen_vs_rest` at 0.50 chance) and 30–60s online idle threshold calibration.
              </p>
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-frost/50">
                <span className="rounded bg-stone px-2 py-0.5">LOSO</span>
                <span className="rounded bg-stone px-2 py-0.5">BIDS</span>
                <span className="rounded bg-stone px-2 py-0.5">NEGATIVE CONTROLS</span>
              </div>
            </div>
          </div>

          {/* Empirical Baseline Matrix */}
          <div className="p-6 md:p-10 border-b border-frost/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-gold mb-1">
                  <BarChart3 size={14} />
                  <span>Empirical Pilot Benchmarks · nautilus_bci</span>
                </div>
                <h4 className="font-serif text-2xl text-cream">
                  Baseline Decoder &amp; Brain-Switch Matrix
                </h4>
              </div>

              <div className="inline-flex rounded-xl bg-stone/70 border border-frost/10 p-1 self-start">
                <button
                  type="button"
                  onClick={() => setTab("4class")}
                  className={`px-3.5 py-2 rounded-lg font-mono text-xs transition-colors ${
                    tab === "4class"
                      ? "bg-gold text-ink font-semibold"
                      : "text-frost/70 hover:text-cream"
                  }`}
                >
                  4-Class Intent (Chance 25%)
                </button>
                <button
                  type="button"
                  onClick={() => setTab("l2gate")}
                  className={`px-3.5 py-2 rounded-lg font-mono text-xs transition-colors ${
                    tab === "l2gate"
                      ? "bg-sage text-cream font-semibold"
                      : "text-frost/70 hover:text-cream"
                  }`}
                >
                  Async L2 Gate (Brain Switch)
                </button>
              </div>
            </div>

            {tab === "4class" ? (
              <div className="overflow-x-auto rounded-xl border border-frost/10 bg-stone/20">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-frost/10 bg-stone/50 font-mono text-[11px] uppercase tracking-[0.1em] text-gold">
                      <th className="px-4 py-3">Architecture</th>
                      <th className="px-4 py-3">Paradigm</th>
                      <th className="px-4 py-3 text-right">Sub-01 LOSO</th>
                      <th className="px-4 py-3 text-right">Sub-02 LOSO</th>
                      <th className="px-4 py-3 text-right">Peak Session</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fourClassRows.map((r) => (
                      <tr
                        key={r.arch}
                        className="border-b border-frost/[0.06] hover:bg-stone/30 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-cream">
                          {r.arch}
                          {r.highlight && (
                            <span className="ml-2 rounded bg-gold/15 border border-gold/30 px-1.5 py-0.5 font-mono text-[10px] text-gold">
                              TOP
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-frost/60">{r.paradigm}</td>
                        <td className="px-4 py-3 text-right font-mono text-frost/85">{r.sub01}</td>
                        <td className="px-4 py-3 text-right font-mono text-frost/85">{r.sub02}</td>
                        <td className="px-4 py-3 text-right font-mono text-gold">{r.peak}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-frost/10 bg-stone/20">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-frost/10 bg-stone/50 font-mono text-[11px] uppercase tracking-[0.1em] text-sage">
                      <th className="px-4 py-3">Subject / Dataset</th>
                      <th className="px-4 py-3">Held-Out AUC</th>
                      <th className="px-4 py-3">Perm p-val</th>
                      <th className="px-4 py-3">Negative Control</th>
                      <th className="px-4 py-3">Online Detection</th>
                      <th className="px-4 py-3 text-right">Median Latency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {l2GateRows.map((r) => (
                      <tr
                        key={r.subject}
                        className="border-b border-frost/[0.06] hover:bg-stone/30 transition-colors"
                      >
                        <td className="px-4 py-3.5 font-medium text-cream">{r.subject}</td>
                        <td className="px-4 py-3.5 font-mono text-gold">{r.auc}</td>
                        <td className="px-4 py-3.5 font-mono text-frost/75">{r.pval}</td>
                        <td className="px-4 py-3.5 font-mono text-sage">{r.negControl}</td>
                        <td className="px-4 py-3.5 font-mono text-frost/85">{r.replay}</td>
                        <td className="px-4 py-3.5 text-right font-mono text-cream">{r.latency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <p className="mt-4 text-xs font-mono text-frost/45">
              Source: nautilus_bci/results/SUMMARY_FINDINGS_TABLE.md · Unimodal EEG baselines before multimodal/LUPI gating.
            </p>
          </div>

          {/* Open-source ecosystem strip */}
          <div className="px-6 md:px-10 py-8 md:py-10">
            <div className="rounded-xl bg-stone/30 border border-frost/10 p-5 md:p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-gold">
                  Open-Source BCI Ecosystem — Built in the Open
                </h4>
                <span className="font-mono text-[10px] text-frost/40">github.com/JohnGF</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {[
                  { name: "nautilus_bci", desc: "Nautilus BCI software stack", url: "https://github.com/JohnGF/nautilus_bci" },
                  { name: "bci_workshop", desc: "BCI & advanced HCI workshop", url: "https://github.com/JohnGF/bci_workshop" },
                  { name: "galaxy_watch_lsl", desc: "Wearable IMU/PPG → LSL streaming", url: "https://github.com/JohnGF/galaxy_watch_lsl" },
                  { name: "hikmicro-lsl", desc: "Thermal imaging → LSL pipeline", url: "https://github.com/JohnGF/hikmicro-lsl" },
                ].map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg bg-ink border border-frost/10 px-3 py-3 hover:border-gold/40 transition-colors"
                  >
                    <div className="font-mono text-cream group-hover:text-gold transition-colors">
                      {r.name} ↗
                    </div>
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
