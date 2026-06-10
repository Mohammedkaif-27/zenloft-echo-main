/**
 * ZenLoft Knowledge Base
 * Compiled from all website data for the AI assistant.
 * Structured for client-side semantic search and retrieval.
 */

export interface KnowledgeChunk {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  answer: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  // ═══════════════════════════════════════
  // COMPANY OVERVIEW
  // ═══════════════════════════════════════
  {
    id: "company-overview",
    category: "company",
    question: "What is Zenloft Studio?",
    keywords: ["zenloft", "studio", "company", "agency", "about", "who", "what"],
    answer: "Zenloft Studio is a premium digital agency based in Hyderabad, India. We specialize in website development, digital marketing, social media management, branding & design, content creation, and AI business automation. We build digital empires for bold and ambitious brands worldwide.",
  },
  {
    id: "company-founder",
    category: "company",
    question: "Who is the founder of Zenloft Studio?",
    keywords: ["founder", "ceo", "owner", "started", "created", "mohammed", "kaif", "who founded", "behind"],
    answer: "Zenloft Studio was founded by **Mohammed Kaif**, a passionate entrepreneur and developer based in Hyderabad, India. Mohammed leads the studio's vision of building premium digital experiences for ambitious brands worldwide.",
  },
  {
    id: "company-location",
    category: "company",
    question: "Where is Zenloft Studio located?",
    keywords: ["location", "where", "based", "office", "address", "hyderabad", "india"],
    answer: "Zenloft Studio is based in Hyderabad, Telangana, India. We work with businesses worldwide and communicate through video calls, email, and messaging platforms. We adjust to your timezone for meetings.",
  },
  {
    id: "company-founding",
    category: "company",
    question: "When was Zenloft Studio founded?",
    keywords: ["founded", "started", "when", "established", "year", "history"],
    answer: "Zenloft Studio was founded in 2025 by **Mohammed Kaif**. Since then, we've built over 20 concept projects and case studies showcasing our design, development, and strategic capabilities across multiple industries.",
  },
  {
    id: "company-team",
    category: "company",
    question: "How big is the Zenloft Studio team?",
    keywords: ["team", "people", "employees", "size", "staff", "members"],
    answer: "Zenloft Studio is a lean, high-impact team of designers, developers, and strategists. We keep our team intentionally small to maintain the quality and attention to detail that defines our work. For larger projects, we collaborate with trusted specialists.",
  },
  {
    id: "company-international",
    category: "company",
    question: "Does Zenloft Studio work with international clients?",
    keywords: ["international", "worldwide", "global", "countries", "remote", "overseas"],
    answer: "Yes! We work with businesses worldwide. Our portfolio includes projects designed for markets in the USA, UAE, UK, India, Italy, Turkey, Kuwait, and more. We communicate through video calls, email, and messaging platforms, and we adjust to your timezone.",
  },

  // ═══════════════════════════════════════
  // SERVICES
  // ═══════════════════════════════════════
  {
    id: "services-overview",
    category: "services",
    question: "What services does Zenloft Studio offer?",
    keywords: ["services", "offer", "provide", "do", "help", "what"],
    answer: "We offer 6 core service categories:\n\n1. **Website Development** — Custom websites, e-commerce stores, SaaS platforms, landing pages\n2. **Digital Marketing** — SEO, PPC, email marketing, conversion optimization\n3. **Social Media Management** — Content planning, community management, analytics\n4. **Branding & Design** — Logo design, brand identity, UI/UX design\n5. **Content Creation** — Copywriting, video production, photography\n6. **AI & Business Automation** — AI agents, chatbots, workflow automation, voice assistants\n\nWould you like details on any specific service?",
  },
  {
    id: "service-web-dev",
    category: "services",
    question: "Tell me about your website development services",
    keywords: ["website", "web", "development", "build", "create", "site", "app", "react", "next"],
    answer: "Our Website Development service covers everything from custom business websites to complex SaaS platforms. We build with modern technologies like React, Next.js, TypeScript, and Tailwind CSS.\n\n[PRICING]\n[\n  {\"service\": \"Starter Website\", \"price\": \"₹8,000–₹15,000\"},\n  {\"service\": \"Business Website\", \"price\": \"₹15,000–₹30,000\"},\n  {\"service\": \"Premium Website\", \"price\": \"₹30,000–₹60,000\"},\n  {\"service\": \"Custom Web App\", \"price\": \"₹50,000–₹1,20,000\"}\n]\n[/PRICING]\n\n**Timeline:** 2–6 weeks depending on complexity",
  },
  {
    id: "service-marketing",
    category: "services",
    question: "Tell me about your digital marketing services",
    keywords: ["marketing", "digital", "seo", "ads", "ppc", "google", "advertising", "growth"],
    answer: "Our Digital Marketing service helps businesses grow their online presence and drive revenue.\n\n[PRICING]\n[\n  {\"service\": \"Starter Package\", \"price\": \"₹5,000–₹15,000/month\"},\n  {\"service\": \"Growth Package\", \"price\": \"₹15,000–₹35,000/month\"},\n  {\"service\": \"Premium Package\", \"price\": \"₹35,000–₹75,000/month\"}\n]\n[/PRICING]\n\nIncludes: SEO, Google Ads, PPC, email marketing, analytics & reporting.",
  },
  {
    id: "service-social-media",
    category: "services",
    question: "Tell me about your social media management services",
    keywords: ["social", "media", "instagram", "facebook", "linkedin", "twitter", "tiktok", "posts"],
    answer: "Our Social Media Management service handles your entire social presence so you can focus on your business.\n\n[PRICING]\n[\n  {\"service\": \"Starter\", \"price\": \"₹5,000/month\"},\n  {\"service\": \"Growth\", \"price\": \"₹10,000–₹20,000/month\"},\n  {\"service\": \"Premium\", \"price\": \"₹20,000–₹40,000/month\"}\n]\n[/PRICING]\n\n**Platforms:** Instagram, Facebook, LinkedIn, Twitter/X, TikTok",
  },
  {
    id: "service-branding",
    category: "services",
    question: "Tell me about your branding and design services",
    keywords: ["branding", "brand", "logo", "identity", "design", "ui", "ux", "visual"],
    answer: "Our Branding & Design service creates cohesive brand identities that communicate your values and attract your ideal customers.\n\n[PRICING]\n[\n  {\"service\": \"Logo Design\", \"price\": \"₹3,000–₹10,000\"},\n  {\"service\": \"Brand Kit\", \"price\": \"₹8,000–₹20,000\"},\n  {\"service\": \"Complete Branding\", \"price\": \"₹20,000–₹50,000\"}\n]\n[/PRICING]\n\n**Timeline:** 2–4 weeks",
  },
  {
    id: "service-content",
    category: "services",
    question: "Tell me about your content creation services",
    keywords: ["content", "creation", "writing", "copy", "video", "photography", "blog"],
    answer: "Our Content Creation service produces high-quality content that engages your audience and drives conversions.\n\n**What's included:**\n• Website copywriting\n• Blog & article writing\n• Video production & editing\n• Product photography\n• Infographics & visual content\n• Email newsletter content\n\n**Timeline:** Ongoing or project-based\n**Starting from:** ₹5,000/project",
  },
  {
    id: "service-ai",
    category: "services",
    question: "Tell me about your AI and automation services",
    keywords: ["ai", "automation", "artificial", "intelligence", "chatbot", "bot", "agent", "voice", "workflow"],
    answer: "Our AI & Business Automation service builds intelligent systems that streamline your operations and save time.\n\n[PRICING]\n[\n  {\"service\": \"Basic AI Automation\", \"price\": \"₹10,000–₹25,000\"},\n  {\"service\": \"Business Automation\", \"price\": \"₹25,000–₹60,000\"},\n  {\"service\": \"Advanced AI Systems\", \"price\": \"₹60,000–₹1,50,000\"}\n]\n[/PRICING]\n\nIncludes: AI chatbots, voice assistants, workflow automation, WhatsApp bots, custom AI agents.\n**Timeline:** 3–6 weeks",
  },

  // ═══════════════════════════════════════
  // PRICING
  // ═══════════════════════════════════════
  {
    id: "pricing-overview",
    category: "pricing",
    question: "How much do your services cost?",
    keywords: ["price", "cost", "pricing", "how much", "budget", "rate", "charge", "fee", "affordable", "expensive"],
    answer: "Here's an overview of our pricing:\n\n[PRICING]\n[\n  {\"service\": \"Starter Website\", \"price\": \"₹8,000\"},\n  {\"service\": \"Business Website\", \"price\": \"₹15,000–₹30,000\"},\n  {\"service\": \"Premium Website\", \"price\": \"₹30,000–₹60,000\"},\n  {\"service\": \"Custom Web App\", \"price\": \"₹50,000–₹1,20,000\"},\n  {\"service\": \"Digital Marketing\", \"price\": \"₹5,000/month\"},\n  {\"service\": \"Social Media\", \"price\": \"₹5,000/month\"},\n  {\"service\": \"Logo Design\", \"price\": \"₹3,000\"},\n  {\"service\": \"Brand Kit\", \"price\": \"₹8,000\"},\n  {\"service\": \"AI Automation\", \"price\": \"₹10,000+\"}\n]\n[/PRICING]\n\nAll pricing is competitive and startup-friendly. Want a detailed quote? I can help you get started!",
  },
  {
    id: "pricing-payment",
    category: "pricing",
    question: "What payment methods do you accept?",
    keywords: ["payment", "pay", "method", "stripe", "bank", "transfer", "invoice"],
    answer: "We accept payments via bank transfer, Stripe, PayPal, and UPI (for Indian clients). We typically work with a 50% upfront deposit and 50% on delivery for project-based work. Monthly retainers are billed at the start of each month.",
  },

  // ═══════════════════════════════════════
  // PROCESS
  // ═══════════════════════════════════════
  {
    id: "process-overview",
    category: "process",
    question: "What is your development process?",
    keywords: ["process", "how", "work", "steps", "methodology", "approach", "workflow"],
    answer: "Our process follows 4 clear steps:\n\n**1. Discovery (Week 1)**\nWe learn about your business, goals, and target audience. We deliver a project brief and strategy document.\n\n**2. Design (Week 1–2)**\nWe create wireframes and high-fidelity designs in Figma. You review and approve before we code anything.\n\n**3. Development (Week 2–4)**\nWe build your project with clean, modern code. You get progress updates and a staging URL to review.\n\n**4. Launch & Support (Week 4+)**\nWe deploy, test, and hand over. We provide 30 days of free post-launch support.\n\nTimelines vary by project complexity. A landing page takes ~2 weeks, a full website 3–4 weeks, and complex platforms 4–6 weeks.",
  },
  {
    id: "process-timeline",
    category: "process",
    question: "How long does a project take?",
    keywords: ["timeline", "long", "time", "weeks", "days", "duration", "deadline", "fast", "quick"],
    answer: "Typical timelines:\n\n• **Landing Page:** 2 weeks\n• **Business Website:** 3–4 weeks\n• **E-Commerce Store:** 4–5 weeks\n• **SaaS Platform:** 4–6 weeks\n• **Branding Package:** 2–4 weeks\n• **AI Automation:** 3–6 weeks\n\nWe can accommodate rush projects for an additional fee. Every project includes a thorough QA phase before launch.",
  },
  {
    id: "process-revisions",
    category: "process",
    question: "How many revisions do I get?",
    keywords: ["revisions", "changes", "modifications", "rounds", "feedback", "iterations"],
    answer: "We include 2–3 rounds of revisions in every project. Our discovery phase is thorough enough that most projects require minimal changes. Additional revision rounds can be arranged if needed.",
  },

  // ═══════════════════════════════════════
  // TECHNOLOGY
  // ═══════════════════════════════════════
  {
    id: "tech-stack",
    category: "technology",
    question: "What technologies do you use?",
    keywords: ["technology", "tech", "stack", "tools", "framework", "language", "react", "next", "typescript"],
    answer: "Our primary tech stack includes:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n**Backend:** Supabase, PostgreSQL, Node.js\n**Payments:** Stripe\n**3D/Animation:** Three.js, GSAP\n**AI/Automation:** LangChain, OpenAI, Gemini, n8n, Zapier, Make\n**Deployment:** Vercel, Netlify, AWS\n**Design:** Figma, Adobe Creative Suite\n\nWe choose the best technology for each project's specific requirements to ensure performance, scalability, and maintainability.",
  },

  // ═══════════════════════════════════════
  // CONTACT
  // ═══════════════════════════════════════
  {
    id: "contact-info",
    category: "contact",
    question: "How can I contact Zenloft Studio?",
    keywords: ["contact", "reach", "email", "phone", "whatsapp", "call", "talk", "message", "get in touch"],
    answer: "You can reach us through:\n\n📧 **Email:** zenloftstudio@gmail.com\n📞 **Phone:** +91 9705407470\n💬 **WhatsApp:** +91 8520030086\n🌐 **Website:** zenloftstudio.online\n\n**Social Media:**\n• Instagram: @zenloftstudio\n• GitHub: github.com/zenloftstudio\n• LinkedIn: linkedin.com/in/zenloftstudio\n• Twitter: x.com/zenloftstudio\n\nWe typically respond within 24 hours. For urgent inquiries, WhatsApp or Phone is the fastest way to reach us!",
  },
  {
    id: "contact-consultation",
    category: "contact",
    question: "Do you offer free consultations?",
    keywords: ["consultation", "free", "call", "meeting", "strategy", "discuss", "talk"],
    answer: "Yes! We offer a free strategy call where we discuss your project, goals, and how we can help. No pitch, no pressure — just an honest conversation about what's possible. You can book a call by emailing us at zenloftstudio@gmail.com or messaging us on WhatsApp.",
  },

  // ═══════════════════════════════════════
  // PORTFOLIO / CASE STUDIES
  // ═══════════════════════════════════════
  {
    id: "portfolio-overview",
    category: "portfolio",
    question: "Can I see your portfolio?",
    keywords: ["portfolio", "work", "projects", "examples", "case studies", "showcase", "see"],
    answer: "Absolutely! We have 20 case studies and concept projects across multiple industries including luxury retail, fitness, SaaS, real estate, fintech, hospitality, healthcare, and more.\n\nYou can explore them all on our **Works** page. Some highlights:\n\n• **CHRONOS** — Luxury e-commerce case study\n• **PROSE.AI** — SaaS landing page concept\n• **DATASTREAM** — B2B analytics dashboard\n• **AURA SKIN** — DTC beauty e-commerce\n• **NEXCHAIN** — Web3 launch page\n\nEach project includes the problem statement, proposed solution, expected impact, tech stack, and a live demo you can explore.",
  },
  {
    id: "portfolio-industries",
    category: "portfolio",
    question: "What industries have you worked in?",
    keywords: ["industries", "sectors", "verticals", "experience", "niche", "market"],
    answer: "Our case studies span multiple industries:\n\n• Luxury Retail & E-Commerce\n• Fitness & Wellness\n• AI / SaaS\n• Real Estate\n• Music & Entertainment\n• Fintech & DeFi\n• Health & Beauty\n• B2B Analytics\n• Creative Agencies\n• Streetwear & Fashion\n• Hospitality\n• Travel & Tourism\n• Food & Dining\n• EdTech\n• Photography\n• Healthcare\n• Developer Tools\n\nWhatever your industry, we bring cross-sector insights that give your project a competitive edge.",
  },

  // ═══════════════════════════════════════
  // ONBOARDING
  // ═══════════════════════════════════════
  {
    id: "onboarding-process",
    category: "onboarding",
    question: "How do I start a project with you?",
    keywords: ["start", "begin", "onboarding", "hire", "get started", "work with", "engage"],
    answer: "Getting started is simple:\n\n**Step 1:** Reach out via email (zenloftstudio@gmail.com) or WhatsApp with a brief description of your project.\n\n**Step 2:** We schedule a free strategy call to understand your goals, timeline, and budget.\n\n**Step 3:** We send you a detailed proposal with scope, timeline, and fixed pricing.\n\n**Step 4:** Once approved, we collect a 50% deposit and kick off the project.\n\n**Step 5:** We keep you updated throughout with regular check-ins and a staging URL.\n\nReady to start? I can help you draft a project brief right now!",
  },

  // ═══════════════════════════════════════
  // FAQS
  // ═══════════════════════════════════════
  {
    id: "faq-support",
    category: "faq",
    question: "Do you provide post-launch support?",
    keywords: ["support", "maintenance", "after", "launch", "post", "bug", "fix", "update"],
    answer: "Yes! Every project includes 30 days of free post-launch support covering bug fixes, minor adjustments, and technical support. After that, we offer affordable monthly maintenance plans starting at ₹3,000/month for ongoing updates, security patches, and performance monitoring.",
  },
  {
    id: "faq-refund",
    category: "faq",
    question: "What is your refund policy?",
    keywords: ["refund", "money", "back", "cancel", "guarantee", "policy"],
    answer: "We work with clear milestones and approval gates. If you're not satisfied with the design phase, we'll work with you until it's right. The 50% deposit covers the discovery and design phases. Once development begins, we don't offer refunds, but we do guarantee delivery of the agreed scope.",
  },
  {
    id: "faq-ownership",
    category: "faq",
    question: "Who owns the code and design files?",
    keywords: ["ownership", "own", "code", "files", "source", "rights", "intellectual", "property"],
    answer: "You do! Upon final payment, you receive full ownership of all code, design files, and assets. We provide complete Figma files, source code repository access, and deployment credentials. Everything is yours.",
  },

  // ═══════════════════════════════════════
  // GREETING / GENERAL
  // ═══════════════════════════════════════
  {
    id: "greeting",
    category: "general",
    question: "Hello / Hi / Hey",
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "howdy", "greetings", "sup"],
    answer: "Hey there! 👋 Welcome to Zenloft Studio. I'm your AI assistant — I can help you learn about our services, explore our portfolio, get pricing info, or start a project conversation.\n\nHere are some things I can help with:\n• Our services and pricing\n• Portfolio and case studies\n• Development process and timelines\n• Getting started on a project\n\nWhat would you like to know?",
  },
  {
    id: "thanks",
    category: "general",
    question: "Thank you / Thanks",
    keywords: ["thank", "thanks", "appreciate", "grateful", "cheers"],
    answer: "You're welcome! 😊 If you have any more questions about our services or want to discuss a project, I'm here to help. You can also reach our team directly at zenloftstudio@gmail.com or via WhatsApp.",
  },
];

export const suggestedQuestions = [
  "What services do you offer?",
  "How much does a website cost?",
  "Can I see your portfolio?",
  "How do I start a project?",
  "What technologies do you use?",
];

export const welcomeMessage =
  "Hi! 👋 I'm the Zenloft Studio assistant. I can answer questions about our services, pricing, portfolio, and process. How can I help you today?";
