import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeBand from "@/components/sections/MarqueeBand";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import GitHubStats from "@/components/sections/GitHubStats";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <MarqueeBand />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GitHubStats />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
