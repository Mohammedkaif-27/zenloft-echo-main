import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useSEO } from "@/hooks/useSEO";
import { useEffect } from "react";

const Contact = () => {
  useSEO({
    title: "Contact Us | Zenloft Studio",
    description: "Start your project with Zenloft Studio. We build premium websites, AI automations, and scalable digital products for bold brands worldwide.",
    ogUrl: "https://zenloftstudio.online/contact",
  });

  // Ensure scroll to top on mount (backup for lenis/router scroll)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-0">
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
