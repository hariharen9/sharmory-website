import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Why } from "@/components/Why";
import { Origin } from "@/components/Origin";
import { Parity } from "@/components/Parity";
import { Arsenal } from "@/components/Arsenal";
import { Featured } from "@/components/Featured";
import { Landscape } from "@/components/Landscape";
import { Install } from "@/components/Install";
import { Closing } from "@/components/Closing";
import { ScrollFab } from "@/components/ScrollFab";
import { ScrollProgress, Ticker } from "@/components/primitives";

export default function App() {
  return (
    <div className="grain min-h-screen w-full max-w-full overflow-x-hidden bg-background">
      <ScrollProgress />
      <ScrollFab />
      <Nav />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <Ticker
          items={[
            "git",
            "docker",
            "kubernetes",
            "go",
            "node",
            "python",
            "tls",
            "dns",
            "ssh",
            "base64",
            "processes",
            "jenkins",
          ]}
        />
        <Why />
        <Origin />
        <Parity />
        <Arsenal />
        <Featured />
        <Landscape />
        <Install />
        <Closing />
      </main>
    </div>
  );
}
