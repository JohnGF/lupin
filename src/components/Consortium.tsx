import joaoPhoto from "../assets/team/joao.jpg";
import nunoPhoto from "../assets/team/nuno.jpg";
import carlosPhoto from "../assets/team/carlos.jpg";
import mamedePhoto from "../assets/team/mamede.jpg";

const team = [
  { name: "João Tomás Garcia Farinha", role: "Day-to-Day Lead & Architect", org: "LASIGE · FCUL", focus: "Execution, hardware-software co-design, and LUPI distillation", photo: joaoPhoto },
  { name: "Prof. Nuno Garcia", role: "PI — AI & Deep Learning", org: "LASIGE · FCUL", focus: "Multimodal learning, cross-attention, and distillation", photo: nunoPhoto },
  { name: "Prof. Carlos Duarte", role: "HCI & Experiment Design", org: "LASIGE · FCUL", focus: "Human-computer interaction, adaptive systems & UX", photo: carlosPhoto },
  { name: "Prof. Mamede de Carvalho", role: "Clinical Validation", org: "IMM · FMUL", focus: "Clinical neurophysiology and ALS trials", photo: mamedePhoto },
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
        <div className="rounded-2xl border border-frost/10 bg-gradient-to-r from-stone/60 via-ink to-stone/60 p-10 md:p-12 mb-12">
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
              <div><div className="font-serif text-xl text-cream">&quot;la Caixa&quot; Foundation</div><div className="text-xs text-frost/50">CAIXAIMPULSE Health</div></div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-frost/10 flex justify-center">
            <div className="rounded-xl bg-cream px-5 py-3 border border-frost/10">
              <img src="/barra-prr.png" alt="PRR · República Portuguesa · Financiado pela União Europeia NextGenerationEU" className="h-8 md:h-10 w-auto" />
            </div>
          </div>
        </div>

        {/* CaixaImpulse Grant & Translational Milestone Tracker */}
        <div className="rounded-2xl border border-frost/10 bg-graphite/40 p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
              CaixaImpulse Translational Milestone Tracker
            </h3>
            <span className="font-mono text-[11px] text-frost/50">
              CaixaImpulse Validation Stage (Stage 1) · IP planned for Stage 2
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                status: "Completed",
                badge: "bg-sage/15 text-sage border-sage/30",
                title: "Open LSL Acquisition Stack",
                desc: "Unified EEG, fNIRS, watch IMU/PPG, thermal, and gaze streaming into BIDS.",
              },
              {
                step: "02",
                status: "Completed",
                badge: "bg-sage/15 text-sage border-sage/30",
                title: "Pilot LOSO Baselines",
                desc: "4-class imagery & async L2 brain-switch benchmarks with negative controls.",
              },
              {
                step: "03",
                status: "In Progress",
                badge: "bg-gold/15 text-gold border-gold/30",
                title: "Ethics & Multimodal Corpus",
                desc: "Anonymized BIDS multimodal data collection under ethics submission.",
              },
              {
                step: "04",
                status: "Stage 2",
                badge: "bg-stone text-frost/70 border-frost/15",
                title: "LUPI & Clinical Valorization",
                desc: "Teacher→Student distillation, IMM/FMUL validation, and Stage 2 IP filing.",
              },
            ].map((m) => (
              <div key={m.step} className="rounded-xl border border-frost/10 bg-ink/70 p-5 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-frost/45">M{m.step}</span>
                  <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${m.badge}`}>
                    {m.status}
                  </span>
                </div>
                <h4 className="font-serif text-lg text-cream mb-1.5">{m.title}</h4>
                <p className="text-frost/60 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
