import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Why } from "@/components/Why";
import { Origin } from "@/components/Origin";
import { Arsenal } from "@/components/Arsenal";
import { Console } from "@/components/Console";
import { Landscape } from "@/components/Landscape";
import { Install } from "@/components/Install";
import { Closing } from "@/components/Closing";
import { ScrollProgress, Ticker } from "@/components/primitives";

export default function App() {
  return (
    <div className="grain min-h-screen bg-background">
      <ScrollProgress />
      <Nav />
      <main>
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
        <Arsenal />
        <Console />
        <Landscape />
        <Install />
        <Closing />
      </main>
    </div>
  );
}
