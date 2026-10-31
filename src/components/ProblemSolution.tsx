import { CheckCircle2, XCircle } from "lucide-react";

const headers = ["Dimension", "Legacy Lab BCI Pipeline", "LUPIN Paradigm"];
const rows = [
  ["Training / Serving", "Skew — models trained on curated lab data fail in real-world deployment.", "Unified — same architecture from calibration to inference."],
  ["Artifacts", "Fallacy — physiological noise treated as signal, corrupting intent.", "Reframed — artifacts gated and aligned via multimodal fusion."],
  ["Calibration", "High burden — per-session calibration takes 30–90 min per patient.", "Low burden — generative LUPI distillation reduces to near-zero calibration."],
];

export default function ProblemSolution() {
  return (
    <section id="problem" className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">Problem vs. Solution</h2>
          <p className="text-frost/70 text-lg leading-relaxed">Legacy BCI pipelines suffer from three structural failures. LUPIN replaces each with an architectural choice — not an incremental fix.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-frost/10 bg-graphite/40 backdrop-blur-sm">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="border-b border-frost/10 bg-stone/50">
                {headers.map((h) => (
                  <th key={h} className="px-6 py-5 text-left font-mono text-xs uppercase tracking-[0.12em] text-gold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-frost/[0.06] hover:bg-stone/30 transition-colors">
                  <td className="px-6 py-6 font-semibold text-cream">{r[0]}</td>
                  <td className="px-6 py-6 text-oxblood"><span className="inline-flex items-center gap-2"><XCircle size={16} /> {r[1]}</span></td>
                  <td className="px-6 py-6 text-sage"><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> {r[2]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
