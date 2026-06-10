import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const services = [
  {
    title: "Website Development",
    slug: "website-development",
    description: "Business websites, e-commerce stores, landing pages, and ongoing maintenance — every digital touchpoint built from scratch.",
    subServices: ["Business Websites", "E-Commerce Solutions", "Landing Pages", "Website Maintenance"],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "SEO, Google Ads, Meta Ads, email campaigns, and reputation management that drives real traffic and measurable revenue.",
    subServices: ["Search Engine Optimisation", "Paid Advertising", "Email Marketing", "Reputation Management"],
  },
  {
    title: "Social Media Management",
    slug: "social-media-management",
    description: "Content creation, community management, paid social campaigns, and monthly analytics — your brand built on the right platforms.",
    subServices: ["Content Creation", "Social Media Growth", "Paid Social Campaigns", "Account Management"],
  },
  {
    title: "Branding & Design",
    slug: "branding-design",
    description: "Logo systems, brand guidelines, marketing collateral, UI/UX design, and creative assets that make your brand impossible to ignore.",
    subServices: ["Brand Identity", "Marketing Materials", "UI/UX Design", "Creative Design"],
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    description: "Videos, blog articles, social media content, infographics, and copywriting — every asset your brand needs to engage and convert.",
    subServices: ["Video Content", "Written Content", "Social Media Content", "Visual Content"],
  },
  {
    title: "AI & Business Automation",
    slug: "ai-automation",
    description: "AI receptionists, sales agents, voice bots, WhatsApp automation, and end-to-end workflow systems that run your business 24/7.",
    subServices: [
      "AI Receptionist",
      "AI Customer Support",
      "AI Sales & Lead Generation",
      "AI Voice Assistants",
      "AI Hiring Assistant",
      "WhatsApp Automation",
      "Business Process Automation",
      "AI Analytics & Reporting",
    ],
  },
];

const Services = () => {
  useSEO({
    title: "Services — Website Development, Digital Marketing, AI Automation | Zenloft Studio",
    description:
      "Explore Zenloft Studio's full range of digital services: website development, digital marketing, social media management, branding & design, content creation, and AI business automation.",
    ogUrl: "https://zenloftstudio.online/services",
  });

  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-space text-xs text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-clash font-extrabold text-4xl md:text-6xl lg:text-7xl text-foreground mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-satoshi text-muted-foreground text-lg max-w-xl mb-16"
          >
            Everything you need to launch, grow, and dominate your digital presence.
          </motion.p>

          <div className="grid gap-0 border-t border-[rgba(255,255,255,0.06)]">
            {services.map((service, i) => (
              <Link key={service.title} to={`/services/${service.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                  className="group flex items-start justify-between gap-6 py-8 border-b border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.02)] transition-colors px-4 -mx-4 rounded"
                >
                  <div className="flex-1 min-w-0">
                    <h2 className="font-clash font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors flex items-center gap-3">
                      {service.title}
                      <ArrowUpRight
                        size={18}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0"
                      />
                    </h2>
                    <p className="font-satoshi text-sm text-muted-foreground mt-2 max-w-lg">
                      {service.description}
                    </p>
                    {/* Sub-service pills */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {service.subServices.map((sub) => (
                        <span
                          key={sub}
                          className="font-space text-[10px] tracking-wide px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)] text-muted-foreground/60 bg-[rgba(255,255,255,0.02)] group-hover:border-primary/20 group-hover:text-muted-foreground transition-colors duration-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-space text-[11px] text-muted-foreground/40 pt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
