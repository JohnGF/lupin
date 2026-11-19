import { Users, Activity, DollarSign, TrendingUp, Stethoscope, ShieldCheck } from "lucide-react";

const kpis = [
  { icon: Users, value: "140M+", label: "Target Patients (EU Neurological Disorders)" },
  { icon: Activity, value: "93.8M", label: "Stroke Survivors (Long-Term Rehabilitation)" },
  { icon: TrendingUp, value: "15.4M", label: "SCI & ALS Patients (Assistive Need)" },
  { icon: DollarSign, value: "<$1K", label: "Per-Patient Cost Reduction vs. Legacy Calibration" },
];

export default function ClinicalValorization() {
  return (
    <section id="clinical" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">Clinical Valorization & Impact</h2>
          <p className="text-frost/70 text-lg leading-relaxed">Hardware-agnostic Software as a Medical Device (SaMD) designed for scale — from clinical validation to home neurorehab, consumer wearables, and confidence-gated assistive robotics.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-frost/10 bg-graphite/40 p-7 hover:border-gold/30 transition-colors">
              <k.icon size={28} className="text-gold mb-5" strokeWidth={1.5} />
              <div className="font-serif text-4xl md:text-5xl text-cream mb-2">{k.value}</div>
              <div className="text-frost/60 text-sm leading-snug">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Proportional population breakdown */}
        <div className="rounded-2xl border border-frost/10 bg-graphite/40 p-8 md:p-10 mb-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-8">Proportional Population Breakdown — EU Neurological Disorders</h3>
          <div className="space-y-6">
            {[
              { label: "Stroke (93.8M survivors)", pct: 67, color: "bg-gold" },
              { label: "SCI & ALS (15.4M)", pct: 11, color: "bg-sage" },
              { label: "Other Neurological / Rehabilitation (30.8M)", pct: 22, color: "bg-frost/30" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm mb-2"><span className="text-frost/90 font-medium">{b.label}</span><span className="text-frost/50 font-mono">{b.pct}%</span></div>
                <div className="h-3 rounded-full bg-stone/60 overflow-hidden"><div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Roadmap & Ethics by Design */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl border border-frost/10 bg-graphite/40 p-8">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.15em] text-gold mb-3">
              <Stethoscope size={16} />
              <span>Clinical Advisory &amp; Validation</span>
            </div>
            <h3 className="font-serif text-2xl text-cream mb-3">IMM / FMUL Clinical Pathway</h3>
            <p className="text-frost/70 text-sm leading-relaxed">
              Guided by clinical neurophysiology advisor <strong className="text-cream font-medium">Prof. Mamede de Carvalho</strong> (IMM / FMUL), aligning sensor ergonomics, protocol burden, and endpoint metrics with ALS and stroke rehabilitation cohorts.
            </p>
          </div>

          <div className="rounded-2xl border border-sage/30 bg-graphite/40 p-8">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.15em] text-sage mb-3">
              <ShieldCheck size={16} />
              <span>Ethics &amp; Privacy by Design</span>
            </div>
            <h3 className="font-serif text-2xl text-cream mb-3">Anonymized Open-Science Releases</h3>
            <p className="text-frost/70 text-sm leading-relaxed">
              Published BIDS datasets are <strong className="text-cream font-medium">fully anonymized</strong> in accordance with our ethics submission — stripping direct identifiers, using coded subject IDs (<code className="font-mono text-xs text-sage">sub-XX</code>), and excluding raw identifiable media from public releases.
            </p>
          </div>
        </div>

        {/* Asset release cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-stone/60 to-ink p-8">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-3">Intellectual Property</div>
            <h3 className="font-serif text-2xl text-cream mb-3">Stage 2 Scope (None Filed)</h3>
            <p className="text-frost/70 text-sm leading-relaxed mb-6">Currently in CaixaImpulse Validation Stage (Stage 1). Formal IP protection for the multimodal gating and LUPI architecture is scoped for Stage 2.</p>
            <span className="text-frost/50 font-mono text-xs">Stage 1 · Validation</span>
          </div>

          <div className="rounded-2xl border border-frost/10 bg-graphite/40 p-8">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-3">Open Science</div>
            <h3 className="font-serif text-2xl text-cream mb-3">Dual-Stream Asset Release</h3>
            <p className="text-frost/70 text-sm leading-relaxed mb-6">Dataset + model weights under open-science license: BIDS dataset &amp; distilled student checkpoint for validation.</p>
            <a href="#dataset" className="inline-flex items-center gap-2 text-gold font-medium hover:text-cream text-sm transition-colors">Access Dataset →</a>
          </div>

          <div className="rounded-2xl border border-gold/30 bg-graphite/40 p-8">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-3">Presentation Decks</div>
            <h3 className="font-serif text-2xl text-cream mb-3">Venture &amp; Technical Presentations</h3>
            <p className="text-frost/70 text-sm leading-relaxed mb-4">Interactive HTML presentation decks styled with Tailwind CSS:</p>
            <ul className="space-y-2 text-sm font-mono text-frost/90">
              <li><a href="/decks/lupin_roadmap/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">↗ LUPIN Roadmap Deck</a></li>
              <li><a href="/decks/art_pitch/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">↗ Art Pitch Deck</a></li>
              <li><a href="/decks/early_pitch/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">↗ Early Pitch Deck</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
