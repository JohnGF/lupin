import { Users, Activity, DollarSign, TrendingUp } from "lucide-react";

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
          <p className="text-frost/70 text-lg leading-relaxed">Designed for scale — from clinical validation to assistive deployment across the EU neurological burden.</p>
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

        {/* Asset release cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-stone/60 to-ink p-8">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-3">Intellectual Property</div>
            <h3 className="font-serif text-2xl text-cream mb-3">Patent Status: TBD</h3>
            <p className="text-frost/70 text-sm leading-relaxed mb-6">Multimodal gating + manifold alignment architecture — intellectual property protection under evaluation. No formal application filed yet.</p>
            <span className="text-frost/50 font-mono text-xs">[Status TBD]</span>
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
