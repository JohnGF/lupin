import TeamPhoto from "../assets/team/placeholder.svg";

const team = [
  { name: "João Tomás Garcia Farinha", role: "PhD Candidate / Lead Architect", org: "LASIGE · FCUL", focus: "Multimodal gating + LUPI distillation", photo: TeamPhoto },
  { name: "Prof. Nuno Garcia", role: "Principal Investigator", org: "LASIGE · FCUL", focus: "Manifold alignment + open science", photo: TeamPhoto },
  { name: "Prof. Carlos Duarte", role: "Co-Investigator", org: "LASIGE · FCUL", focus: "Signal processing + clinical validation", photo: TeamPhoto },
  { name: "Prof. Mamede de Carvalho", role: "Clinical Lead", org: "IMM / FMUL", focus: "Neurology + assistive deployment", photo: TeamPhoto },
];

export default function Consortium() {
  return (
    <section id="consortium" className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">Consortium Leadership &amp; Partners</h2>
          <p className="text-frost/70 text-lg leading-relaxed">Cross-disciplinary leadership spanning signal processing, clinical neurology, machine learning, and open-science infrastructure.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {team.map((t) => (
            <div key={t.name} className="rounded-2xl border border-frost/10 bg-graphite/40 p-7 hover:border-gold/30 transition-colors">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-stone border border-frost/10 mb-5">
                <img src={t.photo} alt={`${t.name} portrait`} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-xl text-cream mb-1 leading-tight">{t.name}</h3>
              <div className="font-mono text-xs text-gold uppercase tracking-[0.12em] mb-3">{t.role}</div>
              <div className="text-frost/70 text-sm mb-3">{t.org}</div>
              <div className="text-frost/50 text-xs leading-relaxed">Focus: {t.focus}</div>
            </div>
          ))}
        </div>

        {/* Institutional backing banner */}
        <div className="rounded-2xl border border-frost/10 bg-gradient-to-r from-stone/60 via-ink to-stone/60 p-10 md:p-12">
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-8">Institutional Backing</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cream border border-frost/10 p-3 shrink-0">
                <img src="/lasige.svg" alt="LASIGE logo" className="h-6 w-auto" />
              </div>
              <div><div className="font-serif text-xl text-cream">LASIGE</div><div className="text-xs text-frost/50">Intelligent Systems Lab</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cream border border-frost/10 p-3 shrink-0">
                <img src="/fcul.png" alt="FCUL logo" className="h-6 w-auto" />
              </div>
              <div><div className="font-serif text-xl text-cream">FCUL</div><div className="text-xs text-frost/50">Faculty of Sciences</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cream border border-frost/10 p-3 shrink-0">
                <img src="/ulisboa.svg" alt="Universidade de Lisboa logo" className="h-6 w-auto" />
              </div>
              <div><div className="font-serif text-xl text-cream">IMM / FMUL</div><div className="text-xs text-frost/50">Institute of Molecular Medicine</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cream border border-frost/10 p-3 shrink-0">
                <img src="/la-caixa.svg" alt="&quot;la Caixa&quot; Foundation logo" className="h-6 w-auto" />
              </div>
              <div><div className="font-serif text-xl text-cream">"la Caixa" Foundation</div><div className="text-xs text-frost/50">CAIXAIMPULSE Health</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
