import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Privacy = () => {
  useSEO({
    title: "Privacy Policy | Zenloft Studio",
    description: "Read Zenloft Studio's privacy policy. Learn how we collect, use, and protect your personal information when you use our web design and digital agency services.",
    ogUrl: "https://zenloftstudio.online/privacy",
  });

  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
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
            className="font-clash font-extrabold text-4xl md:text-5xl text-foreground mb-10"
          >
            Privacy Policy
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-invert max-w-none font-satoshi text-muted-foreground space-y-8"
          >
            <p className="text-sm">Last updated: March 2026</p>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">1. Information We Collect</h2>
              <p className="text-sm leading-relaxed">
                We collect information you provide directly — such as your name, email, and project details when you contact us. We also collect usage data automatically through cookies and analytics tools, including IP addresses, browser type, and pages visited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">2. How We Use Your Information</h2>
              <p className="text-sm leading-relaxed">
                Your data helps us respond to inquiries, deliver services, improve our website, and communicate updates. We never sell your personal information to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">3. Data Security</h2>
              <p className="text-sm leading-relaxed">
                We implement industry-standard measures to protect your data. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">4. Cookies</h2>
              <p className="text-sm leading-relaxed">
                We use essential cookies for site functionality and analytics cookies to understand how visitors interact with our website. You can disable cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">5. Third-Party Services</h2>
              <p className="text-sm leading-relaxed">
                We may use third-party analytics and hosting providers. These services have their own privacy policies governing use of your information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">6. Contact Us</h2>
              <p className="text-sm leading-relaxed">
                For questions about this policy, reach us at zenloftstudio@gmail.com.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
