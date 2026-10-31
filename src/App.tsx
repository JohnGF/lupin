import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import Architecture from "./components/Architecture";
import ClinicalValorization from "./components/ClinicalValorization";
import BenchmarkDataset from "./components/BenchmarkDataset";
import Consortium from "./components/Consortium";
import OpenSource from "./components/OpenSource";

export default function App() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <Architecture />
      <ClinicalValorization />
      <BenchmarkDataset />
      <OpenSource />
      <Consortium />
      <footer className="bg-ink border-t border-frost/10 py-8 text-center text-xs font-mono text-frost/40">
        LUPIN — Learning User Physiological Intent Networks · LASIGE · FCUL · IMM / FMUL · CAIXAIMPULSE HEALTH INNOVATION
        <div className="mt-2">
          <a href="https://github.com/JohnGF/lupin-platform" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Open source on GitHub ↗</a>
        </div>
      </footer>
    </main>
  );
}
