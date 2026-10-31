import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import Architecture from "./components/Architecture";
import ClinicalValorization from "./components/ClinicalValorization";
import BenchmarkDataset from "./components/BenchmarkDataset";
import Consortium from "./components/Consortium";

export default function App() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <Architecture />
      <ClinicalValorization />
      <BenchmarkDataset />
      <Consortium />
      <footer className="bg-ink border-t border-frost/10 py-8 text-center text-xs font-mono text-frost/40">
        LUPIN — Learning User Physiological Intent Networks · LASIGE · FCUL · IMM / FMUL · CAIXAIMPULSE HEALTH INNOVATION
      </footer>
    </main>
  );
}
