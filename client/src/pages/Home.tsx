import Hero from "@/components/Hero";
import Previews from "@/components/Previews";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-[#0a0a0a]">
      <main>
        <Hero />
        <Previews />
      </main>
    </div>
  );
}
