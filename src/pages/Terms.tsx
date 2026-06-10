import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Terms = () => {
  useSEO({
    title: "Terms of Service | Zenloft Studio",
    description: "Read Zenloft Studio's terms of service. Understand our policies on services, intellectual property, payments, and liability for web design and development projects.",
    ogUrl: "https://zenloftstudio.online/terms",
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
            Terms of Service
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-invert max-w-none font-satoshi text-muted-foreground space-y-8"
          >
            <p className="text-sm">Last updated: March 2026</p>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">1. Agreement to Terms</h2>
              <p className="text-sm leading-relaxed">
                By accessing or using our services, you agree to be bound by these terms. If you disagree with any part, you may not access the service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">2. Services</h2>
              <p className="text-sm leading-relaxed">
                Zenloft Studio provides web design, development, branding, and digital marketing services. Project scope, deliverables, and timelines are defined in individual project agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">3. Intellectual Property</h2>
              <p className="text-sm leading-relaxed">
                Upon full payment, clients receive ownership of final deliverables. Zenloft Studio retains the right to showcase completed work in our portfolio unless otherwise agreed in writing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">4. Payment Terms</h2>
              <p className="text-sm leading-relaxed">
                Payment schedules are outlined in project proposals. Late payments may result in project pauses. All fees are non-refundable once work has commenced unless specified otherwise.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">5. Limitation of Liability</h2>
              <p className="text-sm leading-relaxed">
                Zenloft Studio shall not be liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid for the specific service in question.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">6. Governing Law</h2>
              <p className="text-sm leading-relaxed">
                These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Hyderabad, Telangana.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-clash font-bold text-xl text-foreground">7. Contact</h2>
              <p className="text-sm leading-relaxed">
                Questions about these terms? Email us at hello@zenloftstudio.com.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
