import { useState, useCallback, useEffect } from "react";
import Lenis from "lenis";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import PhilosophySection from "@/components/PhilosophySection";
import ServicesSection from "@/components/ServicesSection";
import ClientsMarquee from "@/components/ClientsMarquee";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { useSEO } from "@/hooks/useSEO";


const Index = () => {
  useSEO({
    title: "Premium Digital Agency | Web Development, Marketing & AI Automation",
    description: "Zenloft Studio is a premium digital agency specializing in website development, digital marketing, social media management, branding, content creation, and AI business automation.",
    ogUrl: "https://zenloftstudio.online/",
  });

  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <LoadingScreen onComplete={handleLoadComplete} />

      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <PhilosophySection />
        <ServicesSection />
        <ClientsMarquee />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
