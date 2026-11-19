import { useState } from "react";
import { ShieldCheck, Terminal, BarChart3, X, ZoomIn } from "lucide-react";

const badges = ["EEG", "fNIRS", "EMG", "EOG", "PPG", "GSR", "IMU", "Gaze", "Thermal"];

type BenchmarkTab = "2class" | "4class" | "l2gate" | "multimodal" | "transfer" | "validation";

const twoClassRhythmRows = [
  {
    pair: "WIND vs. ELECTRICITY",
    n: 136,
    csp: "65.4% ± 6.4%",
    riemannTs: "80.1%",
    riemannSvm: "77.9%",
    welch: "57.3%",
    best: "80.1% (Riemannian TS)",
    highlight: true,
  },
  {
    pair: "FIRE vs. WIND",
    n: 138,
    csp: "47.6% ± 11.3%",
    riemannTs: "65.9%",
    riemannSvm: "68.0%",
    welch: "71.7%",
    best: "71.7% (Welch PSD LDA)",
    highlight: true,
  },
  {
    pair: "FIRE vs. ELECTRICITY",
    n: 138,
    csp: "49.3% ± 3.7%",
    riemannTs: "68.1%",
    riemannSvm: "66.6%",
    welch: "63.8%",
    best: "68.1% (Riemannian TS)",
  },
  {
    pair: "WATER vs. ELECTRICITY",
    n: 138,
    csp: "61.6% ± 4.9%",
    riemannTs: "66.7%",
    riemannSvm: "63.8%",
    welch: "63.0%",
    best: "66.7% (Riemannian TS)",
  },
  {
    pair: "WATER vs. WIND",
    n: 138,
    csp: "45.7% ± 5.3%",
    riemannTs: "50.7%",
    riemannSvm: "57.2%",
    welch: "52.9%",
    best: "62.3% (Riemannian Ridge)",
  },
  {
    pair: "FIRE vs. WATER",
    n: 140,
    csp: "45.7% ± 7.6%",
    riemannTs: "57.1%",
    riemannSvm: "53.6%",
    welch: "58.6%",
    best: "58.6% (Welch PSD LDA)",
  },
];

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

const multimodalAblationRows = [
  { modality: "EEG + PPG", features: 635, gb: "22.50% ± 3.06%", rf: "31.25% ± 3.95%", highlight: true },
  { modality: "EEG + IMU Motion", features: 647, gb: "22.50% ± 5.00%", rf: "25.00% ± 3.95%" },
  { modality: "EEG Only", features: 627, gb: "23.75% ± 4.68%", rf: "22.50% ± 6.37%" },
  { modality: "Full Fusion (EEG + PPG + IMU)", features: 655, gb: "22.50% ± 5.00%", rf: "22.50% ± 6.37%" },
  { modality: "IMU Motion Only", features: 20, gb: "17.50% ± 4.68%", rf: "11.25% ± 4.68%" },
  { modality: "PPG Only", features: 8, gb: "8.75% ± 6.37%", rf: "15.00% ± 5.00%" },
  { modality: "PPG + IMU Motion", features: 28, gb: "15.00% ± 6.37%", rf: "8.75% ± 3.06%" },
];

const fewShotTransferRows = [
  { shots: "k = 0 (Zero-Shot)", baseline: "—", transfer: "70.75%", gain: "Zero-shot prior", chance: "25.00%" },
  { shots: "k = 1", baseline: "53.80% ± 7.71%", transfer: "72.00% ± 2.74%", gain: "+18.19%", chance: "25.69%", highlight: true },
  { shots: "k = 2", baseline: "60.04% ± 5.46%", transfer: "74.02% ± 2.81%", gain: "+13.98%", chance: "30.07%" },
  { shots: "k = 3", baseline: "63.34% ± 3.38%", transfer: "74.82% ± 1.76%", gain: "+11.48%", chance: "22.73%" },
  { shots: "k = 5", baseline: "66.55% ± 4.13%", transfer: "74.50% ± 2.38%", gain: "+7.96%", chance: "25.44%" },
  { shots: "k = 8", baseline: "70.61% ± 3.13%", transfer: "76.40% ± 1.99%", gain: "+5.79%", chance: "21.86%" },
  { shots: "k = 10", baseline: "71.60% ± 3.45%", transfer: "75.97% ± 1.67%", gain: "+4.38%", chance: "24.03%" },
];

const strict2ClassRows = [
  { arch: "EEGNet (GPU CNN)", pipeline: "Depthwise Separable CNN (0.81 s/fold)", acc: "67.62% ± 18.90%", highlight: true },
  { arch: "Riemannian Tangent Space", pipeline: "OAS Covariance + Ridge Classifier", acc: "59.52% ± 15.94%" },
  { arch: "CSP + Shrinkage LDA", pipeline: "Spatial Filter Bank + Shrinkage LDA", acc: "47.14% ± 5.71%" },
  { arch: "ShallowFBCSPNet (GPU)", pipeline: "Temporal & Spatial ConvNet", acc: "43.81% ± 19.61%" },
];

type FigureCategory = "all" | "brain" | "pipeline";

const resultFigures: {
  src: string;
  title: string;
  caption: string;
  category: Exclude<FigureCategory, "all">;
}[] = [
  {
    src: "/media/results/cortical_perception_vs_imagery_topomaps.png",
    title: "Perception vs. Imagery Topomaps",
    caption: "Cortical scalp distributions comparing music perception against silent elemental imagery.",
    category: "brain",
  },
  {
    src: "/media/results/fnf_left_arrow_right_hemisphere_lateralization_map.png",
    title: "Contralateral Hemisphere Lateralization",
    caption: "Right-hemisphere motor lateralization during left-directional imagery (FNF paradigm).",
    category: "brain",
  },
  {
    src: "/media/results/fnf_ses07_directional_topomaps.png",
    title: "4-Direction Spectral Topomaps",
    caption: "Distinct cortical activation patterns across Left, Right, Up, and Down motor imagery.",
    category: "brain",
  },
  {
    src: "/media/results/erd_mu.png",
    title: "Mu-Band (8–12 Hz) ERD Topomap",
    caption: "Event-related desynchronization over sensorimotor cortex during directional imagery.",
    category: "brain",
  },
  {
    src: "/media/results/fnf_mind_vs_movement_spectral_topomap.png",
    title: "Mind vs. Movement Spectral Topomap",
    caption: "Cortical spatial topographies comparing silent imagery against active motor execution.",
    category: "brain",
  },
  {
    src: "/media/results/multimodal_ablation_study.png",
    title: "Multimodal Modality Ablation",
    caption: "EEG, PPG & IMU ablation across Gradient Boosting and Random Forest, plus learned modality contributions.",
    category: "pipeline",
  },
  {
    src: "/media/results/listening_to_active_transfer_curves.png",
    title: "Listening-to-Active Few-Shot Transfer",
    caption: "Auditory cue priors vs. active-only baselines across k=0..10 calibration shots (FNF & Tower Defense).",
    category: "pipeline",
  },
  {
    src: "/media/results/multimodal_pipeline_validation.png",
    title: "3-Engine Live Pipeline Validation",
    caption: "Synchronized blink/PERCLOS, cognitive focus/fatigue, and 4-class BCI decoding over a 467s session.",
    category: "pipeline",
  },
  {
    src: "/media/results/pairwise_rhythm_decoding_imagery.png",
    title: "2-Class Rhythm Pairwise Decoding",
    caption: "Binary music-imagery pairs (50% chance) across 5 pooled sessions, peaking at 80.1% (Wind vs. Electricity).",
    category: "pipeline",
  },
];

const corticalRois = [
  { region: "Auditory Association (STG)", channels: "T7, T8, FT9, FT10, TP9, TP10" },
  { region: "SMA & Premotor (Rhythm)", channels: "Cz, FC1, FC2, FC5, FC6, C3, C4" },
  { region: "Frontal Working Memory", channels: "Fz, F3, F4, F7, F8" },
  { region: "Parietal Integration", channels: "Pz, P3, P4, CP1, CP2" },
  { region: "Occipital Control (Visual)", channels: "O1, O2, Oz" },
];

export default function BenchmarkDataset() {
  const [tab, setTab] = useState<BenchmarkTab>("2class");
  const [figCategory, setFigCategory] = useState<FigureCategory>("all");
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string } | null>(null);
  const visibleFigures =
    figCategory === "all" ? resultFigures : resultFigures.filter((f) => f.category === figCategory);

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

              <div className="flex flex-wrap gap-1 rounded-xl bg-stone/70 border border-frost/10 p-1 self-start">
                <button
                  type="button"
                  onClick={() => setTab("2class")}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                    tab === "2class"
                      ? "bg-gold text-ink font-semibold"
                      : "text-frost/70 hover:text-cream"
                  }`}
                >
                  2-Class Rhythm (50% Chance)
                </button>
                <button
                  type="button"
                  onClick={() => setTab("4class")}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                    tab === "4class"
                      ? "bg-gold text-ink font-semibold"
                      : "text-frost/70 hover:text-cream"
                  }`}
                >
                  4-Class Intent
                </button>
                <button
                  type="button"
                  onClick={() => setTab("l2gate")}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                    tab === "l2gate"
                      ? "bg-sage text-cream font-semibold"
                      : "text-frost/70 hover:text-cream"
                  }`}
                >
                  Async L2 Gate
                </button>
                <button
                  type="button"
                  onClick={() => setTab("multimodal")}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                    tab === "multimodal"
                      ? "bg-gold text-ink font-semibold"
                      : "text-frost/70 hover:text-cream"
                  }`}
                >
                  Multimodal Ablation
                </button>
                <button
                  type="button"
                  onClick={() => setTab("transfer")}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                    tab === "transfer"
                      ? "bg-gold text-ink font-semibold"
                      : "text-frost/70 hover:text-cream"
                  }`}
                >
                  Few-Shot Priming
                </button>
                <button
                  type="button"
                  onClick={() => setTab("validation")}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                    tab === "validation"
                      ? "bg-sage text-cream font-semibold"
                      : "text-frost/70 hover:text-cream"
                  }`}
                >
                  3-Engine &amp; Controls
                </button>
              </div>
            </div>

            {tab === "2class" && (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-xl border border-frost/10 bg-stone/20">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-frost/10 bg-stone/50 font-mono text-[11px] uppercase tracking-[0.1em] text-gold">
                        <th className="px-4 py-3">2-Class Rhythm Pair (50% Chance)</th>
                        <th className="px-4 py-3 text-right">Trials (N)</th>
                        <th className="px-4 py-3 text-right">CSP+LDA</th>
                        <th className="px-4 py-3 text-right">Riemannian TS</th>
                        <th className="px-4 py-3 text-right">Riemannian SVM</th>
                        <th className="px-4 py-3 text-right">Welch PSD</th>
                        <th className="px-4 py-3 text-right">Best Pipeline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {twoClassRhythmRows.map((r) => (
                        <tr
                          key={r.pair}
                          className="border-b border-frost/[0.06] hover:bg-stone/30 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-cream">
                            {r.pair}
                            {r.highlight && (
                              <span className="ml-2 rounded bg-gold/15 border border-gold/30 px-1.5 py-0.5 font-mono text-[10px] text-gold">
                                TOP
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-frost/60">{r.n}</td>
                          <td className="px-4 py-3 text-right font-mono text-frost/75">{r.csp}</td>
                          <td className="px-4 py-3 text-right font-mono text-frost/85">{r.riemannTs}</td>
                          <td className="px-4 py-3 text-right font-mono text-frost/85">{r.riemannSvm}</td>
                          <td className="px-4 py-3 text-right font-mono text-frost/75">{r.welch}</td>
                          <td className="px-4 py-3 text-right font-mono text-gold">{r.best}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-frost/65 leading-relaxed">
                  Binary 2-class music/rhythm imagery decoding (50% chance, analogous to standard 2-class Left vs. Right Motor Imagery BCIs) pooled across 5 sessions (<code className="font-mono text-gold">sub-02_pooled_5sessions</code>).
                </p>
              </div>
            )}

            {tab === "4class" && (
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
            )}

            {tab === "l2gate" && (
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

            {tab === "multimodal" && (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-xl border border-frost/10 bg-stone/20">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-frost/10 bg-stone/50 font-mono text-[11px] uppercase tracking-[0.1em] text-gold">
                        <th className="px-4 py-3">Modality Combination</th>
                        <th className="px-4 py-3 text-right">Features</th>
                        <th className="px-4 py-3 text-right">Gradient Boosting</th>
                        <th className="px-4 py-3 text-right">Random Forest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {multimodalAblationRows.map((r) => (
                        <tr
                          key={r.modality}
                          className="border-b border-frost/[0.06] hover:bg-stone/30 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-cream">
                            {r.modality}
                            {r.highlight && (
                              <span className="ml-2 rounded bg-gold/15 border border-gold/30 px-1.5 py-0.5 font-mono text-[10px] text-gold">
                                +8.75% vs EEG-Only
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-frost/60">{r.features}</td>
                          <td className="px-4 py-3 text-right font-mono text-frost/85">{r.gb}</td>
                          <td className="px-4 py-3 text-right font-mono text-gold">{r.rf}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="rounded-xl bg-stone/30 border border-frost/10 p-3.5">
                    <div className="text-frost/50 mb-1">EEG CONTRIBUTION</div>
                    <div className="text-lg text-cream">97.75% <span className="text-frost/40 text-xs">(w = 0.9996)</span></div>
                  </div>
                  <div className="rounded-xl bg-stone/30 border border-frost/10 p-3.5">
                    <div className="text-frost/50 mb-1">IMU MOTION CONTRIBUTION</div>
                    <div className="text-lg text-cream">1.90% <span className="text-frost/40 text-xs">(w = 0.0002)</span></div>
                  </div>
                  <div className="rounded-xl bg-stone/30 border border-frost/10 p-3.5">
                    <div className="text-frost/50 mb-1">PPG CONTRIBUTION</div>
                    <div className="text-lg text-cream">0.35% <span className="text-frost/40 text-xs">(w = 0.0002)</span></div>
                  </div>
                </div>
              </div>
            )}

            {tab === "transfer" && (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-xl border border-frost/10 bg-stone/20">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-frost/10 bg-stone/50 font-mono text-[11px] uppercase tracking-[0.1em] text-gold">
                        <th className="px-4 py-3">Calibration Shots (FNF)</th>
                        <th className="px-4 py-3 text-right">Active-Only Baseline</th>
                        <th className="px-4 py-3 text-right">Auditory-Primed Transfer</th>
                        <th className="px-4 py-3 text-right">Net Gain</th>
                        <th className="px-4 py-3 text-right">Empirical Chance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fewShotTransferRows.map((r) => (
                        <tr
                          key={r.shots}
                          className="border-b border-frost/[0.06] hover:bg-stone/30 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-cream">
                            {r.shots}
                            {r.highlight && (
                              <span className="ml-2 rounded bg-sage/20 border border-sage/40 px-1.5 py-0.5 font-mono text-[10px] text-sage">
                                1-SHOT JUMP
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-frost/75">{r.baseline}</td>
                          <td className="px-4 py-3 text-right font-mono text-gold">{r.transfer}</td>
                          <td className="px-4 py-3 text-right font-mono text-sage">{r.gain}</td>
                          <td className="px-4 py-3 text-right font-mono text-frost/50">{r.chance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-frost/65 leading-relaxed">
                  In rhythmic FNF imagery, auditory-manifold priming achieves <strong className="text-cream">70.75% zero-shot</strong> and <strong className="text-cream">72.00% at k=1</strong> (chance 25%). By contrast, naive transfer from passive continuous listening (<code className="font-mono text-gold">bids_music</code>) to discrete Tower Defense imagery sits near chance (~23–27%), motivating Engine 02&apos;s affine manifold alignment.
                </p>
              </div>
            )}

            {tab === "validation" && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-stone/30 border border-frost/10 p-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold mb-1">
                      Engine 1 · Blink &amp; PERCLOS
                    </div>
                    <div className="font-serif text-2xl text-cream">218 blinks</div>
                    <div className="text-xs font-mono text-frost/60 mt-1">
                      27.99 blinks/min · 10.58% PERCLOS (467.3s)
                    </div>
                  </div>
                  <div className="rounded-xl bg-stone/30 border border-frost/10 p-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold mb-1">
                      Engine 2 · Cognitive State
                    </div>
                    <div className="font-serif text-2xl text-cream">41.69% Focus</div>
                    <div className="text-xs font-mono text-frost/60 mt-1">
                      26.88% fatigue · TBR 5.54 (sub-04_ses-02)
                    </div>
                  </div>
                  <div className="rounded-xl bg-stone/30 border border-sage/30 p-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-sage mb-1">
                      Engine 3 · 4-Class BCI
                    </div>
                    <div className="font-serif text-2xl text-cream">38.89% CV</div>
                    <div className="text-xs font-mono text-frost/60 mt-1">
                      41 trials · Peak fold 62.5% (Chance 25%)
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-frost/10 bg-stone/20">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-frost/10 bg-stone/50 font-mono text-[11px] uppercase tracking-[0.1em] text-sage">
                        <th className="px-4 py-3">Strict 2-Class Imagery (Sub-02)</th>
                        <th className="px-4 py-3">Pipeline</th>
                        <th className="px-4 py-3 text-right">5-Fold CV (Chance 50%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strict2ClassRows.map((r) => (
                        <tr
                          key={r.arch}
                          className="border-b border-frost/[0.06] hover:bg-stone/30 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-cream">
                            {r.arch}
                            {r.highlight && (
                              <span className="ml-2 rounded bg-sage/20 border border-sage/40 px-1.5 py-0.5 font-mono text-[10px] text-sage">
                                CUDA 4.06s
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-frost/60">{r.pipeline}</td>
                          <td className="px-4 py-3 text-right font-mono text-gold">{r.acc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs font-mono text-frost/55">
                  Anti-leakage controls: pre-cue DC subtraction (-0.5..0s), fold-internal standardization, 70 un-cued Sham Rest epochs, and 50-run permutation null (47.45% ± 9.15%).
                </p>
              </div>
            )}

            <p className="mt-4 text-xs font-mono text-frost/45">
              Source: nautilus_bci/results/ (SUMMARY_FINDINGS_TABLE.md, multimodal_ablation_study.json, listening_to_active_benchmark, live_multimodal_validation, strict_2class_music_benchmark).
            </p>
          </div>

          {/* Empirical Figures Gallery */}
          <div className="p-6 md:p-10 border-b border-frost/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-gold mb-1">
                  Brain Activity Areas &amp; Validation Figures
                </div>
                <h4 className="font-serif text-2xl text-cream">
                  Cortical Topomaps &amp; Benchmark Plots
                </h4>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-xl bg-stone/70 border border-frost/10 p-1">
                  {(
                    [
                      { id: "all", label: "All (9)" },
                      { id: "brain", label: "Brain Activity (5)" },
                      { id: "pipeline", label: "Pipeline & Transfer (4)" },
                    ] as const
                  ).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFigCategory(c.id)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors ${
                        figCategory === c.id
                          ? "bg-gold text-ink font-semibold"
                          : "text-frost/70 hover:text-cream"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <span className="font-mono text-[11px] text-frost/45 hidden sm:inline">Click to enlarge</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {visibleFigures.map((fig) => (
                <button
                  key={fig.src}
                  type="button"
                  onClick={() => setLightbox(fig)}
                  className="group text-left rounded-xl border border-frost/10 bg-stone/25 overflow-hidden hover:border-gold/40 transition-colors flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full bg-cream/95 overflow-hidden">
                    <img
                      src={fig.src}
                      alt={fig.title}
                      loading="lazy"
                      className="w-full h-full object-contain p-1.5 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 rounded-md bg-ink/75 text-cream p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={14} />
                    </div>
                  </div>
                  <div className="p-3.5 flex-1">
                    <div className="font-mono text-xs text-cream group-hover:text-gold transition-colors mb-1">
                      {fig.title}
                    </div>
                    <p className="text-[11px] text-frost/55 leading-relaxed">{fig.caption}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Cortical ROI strip */}
            <div className="rounded-xl bg-stone/25 border border-frost/10 p-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-sage mb-3">
                Decoded Cortical Regions of Interest (32-ch EEG · neuroscience_activation_report.json)
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
                {corticalRois.map((roi) => (
                  <div key={roi.region} className="rounded-lg bg-ink/80 border border-frost/10 px-3 py-2.5">
                    <div className="font-medium text-cream text-xs mb-0.5">{roi.region}</div>
                    <div className="font-mono text-[11px] text-frost/50">{roi.channels}</div>
                  </div>
                ))}
              </div>
            </div>
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

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full rounded-2xl border border-frost/20 bg-graphite overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-frost/10 bg-stone/60">
              <div>
                <div className="font-mono text-xs text-gold">{lightbox.title}</div>
                <div className="text-xs text-frost/60 mt-0.5">{lightbox.caption}</div>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="rounded-lg p-1.5 text-frost/60 hover:text-cream hover:bg-stone transition-colors"
                aria-label="Close figure"
              >
                <X size={18} />
              </button>
            </div>
            <div className="bg-cream p-3 md:p-5 max-h-[80vh] overflow-auto flex items-center justify-center">
              <img src={lightbox.src} alt={lightbox.title} className="max-w-full max-h-[72vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
