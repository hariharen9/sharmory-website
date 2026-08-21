import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Why } from "@/components/Why";
import { Origin } from "@/components/Origin";
import { Parity } from "@/components/Parity";
import { Arsenal } from "@/components/Arsenal";
import { Landscape } from "@/components/Landscape";
import { Install } from "@/components/Install";
import { Closing } from "@/components/Closing";
import { ScrollFab } from "@/components/ScrollFab";
import { ScrollProgress, Ticker } from "@/components/primitives";

import {
  SiGit,
  SiDocker,
  SiKubernetes,
  SiGnubash,
  SiGo,
  SiNodedotjs,
  SiPython,
  SiApple,
  SiLinux,
  SiJenkins,
  SiGithub,
  SiHomebrew,
} from "react-icons/si";
import { FaWindows } from "react-icons/fa6";
import { VscTerminalPowershell } from "react-icons/vsc";
import { FiShield, FiActivity, FiGlobe } from "react-icons/fi";

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
            { label: "git", icon: <SiGit />, color: "#F05032" },
            { label: "docker", icon: <SiDocker />, color: "#2496ED" },
            { label: "kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
            { label: "bash", icon: <SiGnubash />, color: "#4EAA25" },
            { label: "zsh", icon: <SiLinux />, color: "#F1502F" },
            { label: "powershell", icon: <VscTerminalPowershell />, color: "#5391FE" },
            { label: "go", icon: <SiGo />, color: "#00ADD8" },
            { label: "node", icon: <SiNodedotjs />, color: "#5FA04E" },
            { label: "python", icon: <SiPython />, color: "#3776AB" },
            { label: "macos", icon: <SiApple />, color: "#A2AAAD" },
            { label: "linux", icon: <SiLinux />, color: "#FCC624" },
            { label: "windows", icon: <FaWindows />, color: "#0078D4" },
            { label: "tls / dns", icon: <FiGlobe />, color: "#39FF14" },
            { label: "security", icon: <FiShield />, color: "#FF5F56" },
            { label: "processes", icon: <FiActivity />, color: "#FFBD2E" },
            { label: "jenkins", icon: <SiJenkins />, color: "#D24939" },
            { label: "homebrew", icon: <SiHomebrew />, color: "#FBB829" },
            { label: "github", icon: <SiGithub />, color: "#FFFFFF" },
          ]}
        />
        <Why />
        <Origin />
        <Parity />
        <Arsenal />
        <Landscape />
        <Install />
        <Closing />
      </main>
    </div>
  );
}
