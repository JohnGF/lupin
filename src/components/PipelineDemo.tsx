import { PlayCircle } from "lucide-react";

const stages = [
  {
    step: "01",
    label: "LSL Acquisition",
    detail: "Live EEG, fNIRS & wearable streams monitored in pipeline_dashboard.py",
  },
  {
    step: "02",
    label: "QC & Spatial Filter",
    detail: "Diagnostics isolated; bad channels gated before CAR / Laplacian",
  },
  {
    step: "03",
    label: "3D Spatial Task",
    detail: "6-DoF Free Flight & cue-locked neurofeedback trials",
  },
  {
    step: "04",
    label: "Crash-Safe BIDS",
    detail: "Continuous memmap spooling exported directly to BrainVision BIDS",
  },
];

export default function PipelineDemo() {
  return (
    <section id="pipeline-demo" className="relative bg-ink py-24 md:py-28 border-t border-frost/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-gold mb-4">
            <PlayCircle size={15} />
            Pipeline Walkthrough (Draft)
          </div>
          <h2 className="font-serif text-4xl md:text-5xl tracking-[-0.03em] text-cream mb-4">
            From Live Recording to 3D Tasks
          </h2>
          <p className="text-frost/70 text-lg leading-relaxed">
            End-to-end multimodal capture, real-time signal quality gating, interactive 6-DoF task execution, and BIDS export.
          </p>
        </div>

        <div className="rounded-2xl border border-frost/15 bg-graphite/80 p-3 md:p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <video
              className="h-full w-full object-contain"
              controls
              playsInline
              preload="metadata"
              src="/media/pipeline-walkthrough.mp4"
            >
              Your browser does not support embedded MP4 playback.
            </video>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((s) => (
            <div
              key={s.step}
              className="rounded-xl border border-frost/10 bg-stone/40 px-5 py-4"
            >
              <div className="font-mono text-xs text-gold mb-1">STAGE {s.step}</div>
              <div className="font-medium text-cream text-sm mb-1">{s.label}</div>
              <div className="text-frost/60 text-xs leading-relaxed">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
