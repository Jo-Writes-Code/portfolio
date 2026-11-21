import Showcase from "@/components/Showcase";
import { About, WorkIndex } from "@/components/Sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#1d1c1a] scroll-smooth">
      <main>
        <Showcase />
        <WorkIndex />
        <About />
      </main>
    </div>
  );
}
