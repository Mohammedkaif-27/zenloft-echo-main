import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { submitContactForm } from "@/lib/supabase";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  message: z.string().min(20, "Please provide a bit more detail (min 20 chars)"),
  website: z.string().max(0, "Spam detected"), // Honeypot
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
      website: "", // Honeypot
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Save to Supabase
    const result = await submitContactForm({
      name: data.name,
      email: data.email,
      company: data.company,
      project_type: data.projectType,
      budget: data.budget,
      message: data.message,
      source: "contact_form",
    });

    setIsSubmitting(false);

    if (!result.success) {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at zenloftstudio@gmail.com.",
        variant: "destructive",
      });
      return;
    }

    setIsSuccess(true);
    
    toast({
      title: "Message received!",
      description: "We'll get back to you within 24 hours.",
    });

    reset();
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  const whatsappMessage = "Hello Zenloft Studio! I'm interested in starting a project and would like to discuss further.";
  const whatsappUrl = `https://wa.me/918520030086?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section ref={ref} className="relative py-20 md:py-32 px-6 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Copy & Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <p className="font-space text-[11px] text-primary tracking-[0.2em] uppercase mb-6">
            Start Your Project
          </p>
          <h2 className="font-clash font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] text-foreground mb-8">
            Let's build<br />something <span className="text-primary italic">iconic.</span>
          </h2>
          <p className="font-satoshi text-lg text-muted-foreground leading-[1.7] max-w-md mb-12">
            Whether you need a premium website, a complete brand overhaul, or an intelligent AI system — we're ready to bring your vision to life.
          </p>

          <div className="space-y-8">
            <div>
              <p className="font-space text-[11px] text-muted-foreground uppercase tracking-widest mb-3">Email Us</p>
              <a href="mailto:zenloftstudio@gmail.com" className="font-clash text-xl md:text-2xl text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                zenloftstudio@gmail.com
                <ArrowUpRight size={20} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-primary" />
              </a>
            </div>
            
            <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
            
            <div>
              <p className="font-space text-[11px] text-muted-foreground uppercase tracking-widest mb-3">Or chat instantly</p>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 font-satoshi font-bold text-sm bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-foreground h-12 px-6 rounded-lg hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] backdrop-blur-xl rounded-2xl p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Success Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 z-20 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-primary" />
              </div>
              <h3 className="font-clash font-bold text-2xl text-foreground mb-3">Message Sent</h3>
              <p className="font-satoshi text-muted-foreground">
                Thank you for reaching out. We've received your inquiry and will be in touch within 24 hours.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            {/* Honeypot field - hidden from users */}
            <div className="hidden" aria-hidden="true">
              <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="font-space text-[10px] text-muted-foreground uppercase tracking-widest">
                  Name *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full bg-[rgba(0,0,0,0.2)] border ${errors.name ? "border-red-500/50" : "border-[rgba(255,255,255,0.1)]"} rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary/50 focus:outline-none transition-colors`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="flex items-center gap-1 text-red-500 text-xs font-satoshi mt-1">
                    <AlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-space text-[10px] text-muted-foreground uppercase tracking-widest">
                  Email *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full bg-[rgba(0,0,0,0.2)] border ${errors.email ? "border-red-500/50" : "border-[rgba(255,255,255,0.1)]"} rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary/50 focus:outline-none transition-colors`}
                  placeholder="john@company.com"
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-red-500 text-xs font-satoshi mt-1">
                    <AlertCircle size={12} /> {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company */}
              <div className="space-y-2">
                <label className="font-space text-[10px] text-muted-foreground uppercase tracking-widest">
                  Company
                </label>
                <input
                  type="text"
                  {...register("company")}
                  className="w-full bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Company Name"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="font-space text-[10px] text-muted-foreground uppercase tracking-widest">
                  Budget Range
                </label>
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      options={[
                        { value: "< $5k", label: "Under $5k" },
                        { value: "$5k - $10k", label: "$5k - $10k" },
                        { value: "$10k - $25k", label: "$10k - $25k" },
                        { value: "$25k+", label: "$25k+" },
                      ]}
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Select range..."
                    />
                  )}
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label className="font-space text-[10px] text-muted-foreground uppercase tracking-widest">
                What do you need help with? *
              </label>
              <Controller
                name="projectType"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={[
                      { value: "Website Development", label: "Website / Web App Development" },
                      { value: "AI Automation", label: "AI & Business Automation" },
                      { value: "Digital Marketing", label: "Digital Marketing & SEO" },
                      { value: "Social Media", label: "Social Media Management" },
                      { value: "Branding", label: "Branding & Design" },
                      { value: "Content Creation", label: "Content Creation" },
                      { value: "Multiple/Other", label: "Multiple Services / Other" },
                    ]}
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Select service..."
                    error={!!errors.projectType}
                  />
                )}
              />
              {errors.projectType && (
                <p className="flex items-center gap-1 text-red-500 text-xs font-satoshi mt-1">
                  <AlertCircle size={12} /> {errors.projectType.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="font-space text-[10px] text-muted-foreground uppercase tracking-widest">
                Project Details *
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className={`w-full bg-[rgba(0,0,0,0.2)] border ${errors.message ? "border-red-500/50" : "border-[rgba(255,255,255,0.1)]"} rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary/50 focus:outline-none transition-colors resize-y`}
                placeholder="Tell us about your project goals, timeline, and any specific requirements..."
              />
              {errors.message && (
                <p className="flex items-center gap-1 text-red-500 text-xs font-satoshi mt-1">
                  <AlertCircle size={12} /> {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-[#04050A] font-satoshi font-bold text-base h-14 rounded-lg flex items-center justify-center gap-2 hover:bg-[hsl(187,100%,45%)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Inquiry"
              )}
            </button>
            <p className="text-center font-space text-[10px] text-muted-foreground uppercase tracking-widest">
              Your data is safe. We never spam.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
