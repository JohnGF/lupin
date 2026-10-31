import { Boxes, Brain, Camera, Thermometer, Watch, GraduationCap, ArrowUpRight } from "lucide-react";

const GITHUB = "https://github.com/JohnGF";

const repos = [
  { name: "nautilus_bci", icon: Brain, role: "Hub", desc: "g.Nautilus EEG/fNIRS bridges, multimodal BIDS recorder, decoding, tasks and games. Consumes every stream over LSL.", docs: "https://johngf.github.io/nautilus_bci/" },
  { name: "kinect_eye_tracker", icon: Camera, role: "Head pose · gaze", desc: "Kinect v2 head pose and coarse screen gaze (MediaPipe, L2CS-Net) streamed to LSL." },
  { name: "kinect2pipe", icon: Camera, role: "Camera driver", desc: "Kinect v2 on Linux: 1080p webcam, IR night vision, colour + IR + depth over shared memory." },
  { name: "hikmicro-lsl", icon: Thermometer, role: "Thermal", desc: "HIKMICRO / InfiRay thermal camera to LSL, plus offline temperature extraction." },
  { name: "galaxy_watch_lsl", icon: Watch, role: "Wearables", desc: "Wear OS app streaming IMU, heart rate and touch from a smartwatch to the hub." },
  { name: "bci_workshop", icon: GraduationCap, role: "Teaching", desc: "Muse EEG and phone IMU workshop: real-time dashboard and BCI-controlled games." },
];

export default function OpenSource() {
  return (
    <section id="open-source" className="relative bg-ink border-t border-frost/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] text-cream mb-6">Open-Source Platform</h2>
          <p className="text-frost/70 text-lg leading-relaxed">
            The acquisition and recording stack is open. Every sensor publishes to Lab Streaming Layer, and one hub
            records and decodes them in sync.
          </p>
        </div>

        <a href={`${GITHUB}/lupin-platform`} target="_blank" rel="noopener noreferrer"
           className="group mb-10 flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-gold/40 bg-stone/60 p-7 hover:shadow-[0_0_30px_rgba(194,164,93,0.12)] transition-shadow">
          <div className="shrink-0 rounded-xl bg-gold/20 text-gold p-3 self-start"><Boxes size={24} /></div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-1">Start here</div>
            <h3 className="font-serif text-2xl md:text-3xl text-cream leading-tight">lupin-platform</h3>
            <p className="text-frost/70 text-sm mt-2">The whole platform in one clone: every component below as a git submodule.</p>
            <code className="mt-3 inline-block max-w-full overflow-x-auto rounded-lg bg-ink px-3 py-2 font-mono text-xs text-frost/80">
              git clone --recurse-submodules {GITHUB}/lupin-platform.git
            </code>
          </div>
          <ArrowUpRight className="hidden sm:block text-gold/70 group-hover:text-gold transition-colors" size={24} />
        </a>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.name} className="rounded-2xl border border-frost/10 bg-graphite/40 p-7 hover:border-gold/30 transition-colors flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl bg-stone p-2.5 text-frost/70"><Icon size={20} /></div>
                  <div className="font-mono text-xs uppercase tracking-[0.12em] text-gold">{r.role}</div>
                </div>
                <h3 className="font-mono text-lg text-cream mb-2 break-words">{r.name}</h3>
                <p className="text-frost/60 text-sm leading-relaxed mb-5 flex-1">{r.desc}</p>
                <div className="flex gap-4 text-sm">
                  <a href={`${GITHUB}/${r.name}`} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-cream transition-colors">↗ Repository</a>
                  {r.docs && <a href={r.docs} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-cream transition-colors">↗ Docs</a>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
