import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-[#0a0a0a]">
      <main>
        <Hero />
        <Projects />
      </main>
    </div>
  );
}
