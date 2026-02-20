"use client";

import { useState, useEffect } from "react";
import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowCursor from "@/components/layout/GlowCursor";
import BackToTop from "@/components/ui/BackToTop";
import BootScreen from "@/components/ui/BootScreen";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import GitHubStats from "@/components/sections/GitHubStats";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(false);

  useEffect(() => {
    const alreadyBooted = sessionStorage.getItem("portfolio-booted");
    if (!alreadyBooted) {
      setShowBoot(true);
    } else {
      setBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("portfolio-booted", "1");
    setShowBoot(false);
    setBooted(true);
  };

  return (
    <>
      {showBoot && <BootScreen onComplete={handleBootComplete} />}
      {booted && (
        <div className="min-h-screen">
          <Background />
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <GitHubStats />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
          <GlowCursor />
        </div>
      )}
    </>
  );
}
