export interface ServiceFeature {
  name: string;
  description: string;
}

export interface ProcessStep {
  name: string;
  timeframe: string;
  description: string;
  deliverables: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  timeline: string;
  features: string[];
  highlighted?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  name: string;
  headline: [string, string];
  gradientWord: string;
  category: string;
  description: string;
  accentType: "cyan" | "purple" | "mixed" | "gold";
  trustIndicators: { text: string }[];
  subServices: string[];
  features: ServiceFeature[];
  whatWeDoIntro: string;
  processSteps: ProcessStep[];
  techStack: string[];
  relatedCategories: string[];
  pricing: PricingTier[];
  faqs: FAQ[];
}

export const servicesData: ServiceData[] = [
  // ─── 1. WEBSITE DEVELOPMENT ───────────────────────────────────────────────
  {
    slug: "website-development",
    name: "Website Development",
    headline: ["Website", "Development"],
    gradientWord: "Website",
    category: "WEB DEVELOPMENT",
    description:
      "From business websites to full e-commerce stores and high-converting landing pages — we design and build every digital touchpoint your business needs, from scratch, with zero templates.",
    accentType: "cyan",
    trustIndicators: [
      { text: "Delivered in 2–4 weeks" },
      { text: "20+ projects completed" },
    ],
    subServices: [
      "Business Websites",
      "E-Commerce Solutions",
      "Landing Pages",
      "Website Maintenance",
    ],
    whatWeDoIntro:
      "Every website we build is designed from scratch, engineered for speed, and optimized for conversions. Whether it's a corporate site, an online store, or a product launch page — we handle everything from the first wireframe to production deployment.",
    features: [
      { name: "Custom Design", description: "No templates ever. Every pixel designed for your brand and audience." },
      { name: "E-Commerce Ready", description: "Full store setups with payment gateways, catalogs, and order management." },
      { name: "Landing Pages", description: "High-converting lead gen, product launch, and event registration pages." },
      { name: "Mobile First", description: "Perfect on every device from 320px to 4K displays." },
      { name: "Lightning Fast", description: "Core Web Vitals optimized. Sub 2-second load times guaranteed." },
      { name: "CMS Integration", description: "Easy content management without ever touching code." },
      { name: "Website Maintenance", description: "Ongoing updates, security patches, backups, and performance tuning." },
      { name: "SEO Ready", description: "Technical SEO baked in from line one — structured data, sitemaps, meta." },
    ],
    processSteps: [
      {
        name: "Discovery",
        timeframe: "Day 1–2",
        description: "We audit your brand, study your competitors, and map your audience. Every design decision that follows is rooted in this research.",
        deliverables: ["Brand audit", "Competitor analysis", "Project brief"],
      },
      {
        name: "Wireframes",
        timeframe: "Day 3–4",
        description: "Low-fidelity layouts that define information architecture and user flow before any visual work begins.",
        deliverables: ["Page structure", "User flow map", "Content hierarchy"],
      },
      {
        name: "Design",
        timeframe: "Day 5–12",
        description: "High-fidelity visual design in Figma. Every page, every state, every interaction — designed and approved before a single line of code is written.",
        deliverables: ["Desktop designs", "Mobile designs", "Interaction specs"],
      },
      {
        name: "Development",
        timeframe: "Day 13–25",
        description: "Pixel-perfect implementation using modern frameworks. Animations, CMS, payment integrations, and performance optimization all included.",
        deliverables: ["Production code", "CMS setup", "Payment integration"],
      },
      {
        name: "Launch",
        timeframe: "Day 26–30",
        description: "Final QA, client review, DNS configuration, and live deployment. Your site goes live with zero downtime.",
        deliverables: ["QA report", "Production deploy", "Handoff documentation"],
      },
    ],
    techStack: [
      "Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL",
      "Stripe", "Razorpay", "Shopify", "WordPress", "Vercel", "Framer Motion",
    ],
    relatedCategories: ["Digital Marketing", "Branding & Design", "AI & Business Automation"],
    pricing: [
      {
        name: "Starter",
        price: "$999",
        timeline: "2 weeks",
        features: [
          "Up to 5 pages",
          "Mobile responsive",
          "Basic SEO setup",
          "Contact form",
          "CMS integration",
          "1 revision round",
          "30 days support",
        ],
      },
      {
        name: "Growth",
        price: "$2,499",
        timeline: "3–4 weeks",
        features: [
          "Up to 15 pages",
          "Custom animations",
          "E-Commerce (up to 50 products)",
          "Payment gateway setup",
          "Advanced SEO",
          "Analytics integration",
          "3 revision rounds",
          "60 days support",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        timeline: "Let's talk",
        features: [
          "Unlimited pages",
          "Custom SaaS features",
          "Multi-language support",
          "Custom integrations",
          "Priority support",
          "Dedicated manager",
          "Unlimited revisions",
          "SLA guarantee",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you use templates?",
        answer: "Never. Every website we build is designed from scratch in Figma and custom-coded. You won't find your site on a theme marketplace.",
      },
      {
        question: "What platform do you build on?",
        answer: "We primarily use Next.js and React for performance and scalability. For content-heavy sites we integrate headless CMS solutions. For e-commerce we use Shopify or custom Supabase setups depending on your needs.",
      },
      {
        question: "Do you handle hosting and domain?",
        answer: "We help you set up and configure everything — domain, DNS, and hosting on Vercel or your preferred provider. We guide you through ownership so you remain in full control.",
      },
      {
        question: "What's included in website maintenance?",
        answer: "Regular updates, security patches, plugin/dependency upgrades, performance monitoring, backup management, and bug fixes. Think of it as a retainer for keeping your site healthy.",
      },
      {
        question: "Can you redesign an existing website?",
        answer: "Absolutely. Redesigns follow the same process — we audit the existing site, identify what's working, and rebuild with better design, performance, and conversion in mind.",
      },
    ],
  },

  // ─── 2. DIGITAL MARKETING ─────────────────────────────────────────────────
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    headline: ["Digital", "Marketing"],
    gradientWord: "Marketing",
    category: "DIGITAL MARKETING",
    description:
      "SEO, paid ads, email campaigns, and reputation management — the full stack of strategies that drive real traffic, real leads, and real revenue for your business.",
    accentType: "purple",
    trustIndicators: [
      { text: "Results in 30–90 days" },
      { text: "15+ campaigns managed" },
    ],
    subServices: [
      "Search Engine Optimization (SEO)",
      "Paid Advertising",
      "Email Marketing",
      "Online Reputation Management",
    ],
    whatWeDoIntro:
      "We don't run vanity campaigns. Every strategy we build is tied to measurable business outcomes — more traffic, more leads, lower acquisition cost. From technical SEO to Google Ads to automated email sequences, we cover every growth channel.",
    features: [
      { name: "Local & Technical SEO", description: "On-page, off-page, and technical SEO that ranks you where it counts." },
      { name: "Google Ads", description: "Search and display campaigns optimized for maximum ROAS." },
      { name: "Meta Ads", description: "Facebook and Instagram ad campaigns targeting your exact audience." },
      { name: "YouTube Ads", description: "Video ad campaigns that build brand awareness and generate leads." },
      { name: "Email Marketing", description: "Newsletter campaigns, drip sequences, and promotional emails." },
      { name: "Lead Gen Campaigns", description: "Multi-channel campaigns designed around one goal: qualified leads." },
      { name: "Reputation Management", description: "Review monitoring, brand listening, and customer feedback systems." },
      { name: "Performance Reporting", description: "Monthly reports with real numbers, insights, and next-step recommendations." },
    ],
    processSteps: [
      {
        name: "Audit & Research",
        timeframe: "Week 1",
        description: "We audit your current digital presence, analyze competitors, and identify the highest-ROI channels for your business.",
        deliverables: ["SEO audit", "Competitor analysis", "Channel recommendation"],
      },
      {
        name: "Strategy",
        timeframe: "Week 2",
        description: "We build a 90-day marketing strategy with clear KPIs, budget allocation, and channel-specific tactics.",
        deliverables: ["90-day roadmap", "Budget plan", "KPI dashboard"],
      },
      {
        name: "Campaign Setup",
        timeframe: "Week 3",
        description: "Ad accounts configured, campaigns created, email sequences written, and tracking pixels installed.",
        deliverables: ["Live campaigns", "Email flows", "Tracking setup"],
      },
      {
        name: "Optimisation",
        timeframe: "Ongoing",
        description: "Weekly review of performance data with active adjustments to targeting, bids, copy, and landing pages.",
        deliverables: ["Weekly tweaks", "A/B test results", "Conversion improvements"],
      },
      {
        name: "Reporting",
        timeframe: "Monthly",
        description: "Comprehensive performance report covering every channel — what worked, what didn't, and what's next.",
        deliverables: ["Monthly report", "Insights summary", "Next month plan"],
      },
    ],
    techStack: [
      "Google Ads", "Meta Ads Manager", "Google Analytics 4", "Google Search Console",
      "Ahrefs", "SEMrush", "Mailchimp", "Klaviyo", "Screaming Frog", "Hotjar",
    ],
    relatedCategories: ["Website Development", "Content Creation", "Social Media Management"],
    pricing: [
      {
        name: "Starter",
        price: "$799/mo",
        timeline: "Monthly",
        features: [
          "SEO (on-page + technical)",
          "1 paid channel (Google or Meta)",
          "Monthly reporting",
          "Keyword research",
          "Basic email setup",
          "Support via chat",
        ],
      },
      {
        name: "Growth",
        price: "$1,499/mo",
        timeline: "Monthly",
        features: [
          "Full SEO (local + technical)",
          "Google + Meta Ads",
          "Email marketing (up to 3 sequences)",
          "Reputation monitoring",
          "Weekly performance reviews",
          "Bi-weekly strategy calls",
          "Priority support",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        timeline: "Let's talk",
        features: [
          "All channels managed",
          "Dedicated account manager",
          "Custom reporting dashboard",
          "Unlimited ad creatives",
          "Cross-channel attribution",
          "SLA guarantee",
        ],
      },
    ],
    faqs: [
      {
        question: "How long until I see results from SEO?",
        answer: "Technical fixes and speed improvements can show results within weeks. Search ranking improvements typically take 4–12 weeks depending on competition. We set realistic timelines and track every change.",
      },
      {
        question: "What's your minimum ad spend?",
        answer: "We recommend a minimum of $500/month ad spend per channel to gather enough data for meaningful optimization. Our management fee is separate from your ad budget.",
      },
      {
        question: "Do you guarantee results?",
        answer: "We don't guarantee specific rankings or ROAS figures — no honest agency does. What we guarantee is a data-driven approach, transparent reporting, and continuous optimization toward your goals.",
      },
      {
        question: "What does email marketing include?",
        answer: "List setup, template design, copywriting, campaign scheduling, A/B testing, and performance tracking. We build both one-off campaigns and automated drip sequences.",
      },
      {
        question: "Can you manage ads for a business in India?",
        answer: "Yes. We work with Indian businesses and understand local audience targeting, regional language considerations, and INR-denominated campaign budgets.",
      },
    ],
  },

  // ─── 3. SOCIAL MEDIA MANAGEMENT ──────────────────────────────────────────
  {
    slug: "social-media-management",
    name: "Social Media Management",
    headline: ["Social Media", "Management"],
    gradientWord: "Social",
    category: "SOCIAL MEDIA",
    description:
      "Content creation, community management, paid social campaigns, and monthly analytics — everything your brand needs to build a real audience and turn followers into customers.",
    accentType: "purple",
    trustIndicators: [
      { text: "Consistent monthly output" },
      { text: "10+ brands managed" },
    ],
    subServices: [
      "Content Creation",
      "Social Media Growth",
      "Paid Social Campaigns",
      "Account Management",
    ],
    whatWeDoIntro:
      "Social media is not about posting daily — it's about posting with purpose. We build content systems, manage communities, run paid campaigns, and track everything so your brand grows on the right platforms with the right audience.",
    features: [
      { name: "Reels & Shorts", description: "Short-form video content designed for algorithmic reach." },
      { name: "Static Posts & Stories", description: "On-brand creative designs for every platform." },
      { name: "Community Management", description: "Responding to comments, DMs, and engaging your audience daily." },
      { name: "Profile Optimisation", description: "Bios, highlights, link-in-bio, and platform-specific setup." },
      { name: "Facebook & Instagram Ads", description: "Paid campaigns for lead gen, reach, and retargeting." },
      { name: "Organic Growth Strategy", description: "Hashtag research, posting schedules, and growth tactics." },
      { name: "Posting Schedules", description: "Planned and approved content calendar delivered weekly." },
      { name: "Monthly Reporting", description: "Reach, engagement, follower growth, and ad performance reviewed monthly." },
    ],
    processSteps: [
      {
        name: "Brand & Audience Audit",
        timeframe: "Week 1",
        description: "We review your current profiles, audience demographics, competitor presence, and content performance to build a clear baseline.",
        deliverables: ["Profile audit", "Competitor review", "Content gap analysis"],
      },
      {
        name: "Content Strategy",
        timeframe: "Week 1–2",
        description: "We define content pillars, posting frequency, platform priorities, and visual style aligned with your brand.",
        deliverables: ["Content pillars", "Platform strategy", "Visual direction"],
      },
      {
        name: "Content Production",
        timeframe: "Ongoing (monthly)",
        description: "Design, copywriting, video editing, and scheduling. All content is approved before it goes live.",
        deliverables: ["Monthly content batch", "Captions & hashtags", "Scheduled posts"],
      },
      {
        name: "Community Engagement",
        timeframe: "Daily",
        description: "We manage your inbox, respond to comments, and engage with your audience to signal activity to the algorithm.",
        deliverables: ["Daily engagement", "DM management", "Comment responses"],
      },
      {
        name: "Reporting & Optimisation",
        timeframe: "Monthly",
        description: "Monthly analytics review covering what content worked, audience growth, and the strategy adjustments for next month.",
        deliverables: ["Monthly analytics", "Growth report", "Next month plan"],
      },
    ],
    techStack: [
      "Canva Pro", "Adobe Premiere", "CapCut", "Later", "Buffer", "Meta Business Suite",
      "Instagram Insights", "Facebook Ads Manager", "Notion", "Google Drive",
    ],
    relatedCategories: ["Digital Marketing", "Content Creation", "Branding & Design"],
    pricing: [
      {
        name: "Starter",
        price: "$599/mo",
        timeline: "Monthly",
        features: [
          "1 platform (Instagram or Facebook)",
          "12 posts/month",
          "Basic graphic design",
          "Caption writing",
          "Monthly report",
          "Posting schedule",
        ],
      },
      {
        name: "Growth",
        price: "$1,199/mo",
        timeline: "Monthly",
        features: [
          "2 platforms",
          "20 posts + 4 Reels/month",
          "Custom graphic design",
          "Community management",
          "Paid ad management (1 campaign)",
          "Bi-weekly strategy sync",
          "Monthly analytics report",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        timeline: "Let's talk",
        features: [
          "All platforms",
          "Unlimited content",
          "Full ad management",
          "Dedicated social manager",
          "Real-time analytics",
          "Crisis communication support",
        ],
      },
    ],
    faqs: [
      {
        question: "Which platforms do you manage?",
        answer: "Instagram, Facebook, LinkedIn, YouTube, and X (Twitter). We recommend starting with 1–2 platforms and expanding once we have a winning content formula.",
      },
      {
        question: "Do you create video content?",
        answer: "Yes. We produce Reels, YouTube Shorts, and story videos. You provide raw footage or product assets — we handle editing, captions, transitions, and music.",
      },
      {
        question: "How do you handle approval?",
        answer: "All content is prepared in a content calendar and shared for approval before scheduling. You review and request any changes before anything goes live.",
      },
      {
        question: "What if I already have a social media team?",
        answer: "We can work alongside your existing team — taking over specific functions like paid ads, Reels production, or monthly analytics — without duplicating effort.",
      },
      {
        question: "Is ad spend included in the price?",
        answer: "No. Our price covers campaign setup, targeting, and management. Your ad spend goes directly to Meta or Google and is separate from our management fee.",
      },
    ],
  },

  // ─── 4. BRANDING & DESIGN ─────────────────────────────────────────────────
  {
    slug: "branding-design",
    name: "Branding & Design",
    headline: ["Branding &", "Design"],
    gradientWord: "Branding",
    category: "BRANDING & DESIGN",
    description:
      "Logo systems, brand guidelines, marketing collateral, UI/UX design, and creative assets that make your brand instantly recognizable and impossible to ignore.",
    accentType: "gold",
    trustIndicators: [
      { text: "Delivered in 1–3 weeks" },
      { text: "25+ brands designed" },
    ],
    subServices: [
      "Brand Identity",
      "Marketing Materials",
      "UI/UX Design",
      "Creative Design",
    ],
    whatWeDoIntro:
      "Your brand is more than a logo. It's the system of colours, typography, voice, and visual language that tells customers who you are before you say a word. We build complete identity systems — from the first icon to a full design language — that scale across every medium.",
    features: [
      { name: "Logo Design", description: "Primary, secondary, and icon variants with full usage guidelines." },
      { name: "Brand Guidelines", description: "The complete rulebook: colours, type, spacing, and do/don't examples." },
      { name: "Color & Typography", description: "Palette systems and typeface pairing that carry your brand's personality." },
      { name: "Marketing Collateral", description: "Posters, flyers, brochures, and business cards ready to print." },
      { name: "UI/UX Design", description: "Website, app, and dashboard interfaces built around user experience." },
      { name: "Wireframing & Prototyping", description: "Clickable prototypes and user flow validation before development." },
      { name: "Social Media Creatives", description: "Post templates, ad banners, and story formats in your brand system." },
      { name: "Presentation Design", description: "Pitch decks, investor decks, and proposal templates." },
    ],
    processSteps: [
      {
        name: "Discovery",
        timeframe: "Day 1–2",
        description: "Brand questionnaire, competitor audit, and mood board session to align on visual direction and brand values.",
        deliverables: ["Brand brief", "Mood boards", "Competitor audit"],
      },
      {
        name: "Concept Development",
        timeframe: "Day 3–7",
        description: "We present 2–3 distinct brand directions with logo concepts, colour palettes, and typography pairings.",
        deliverables: ["Logo concepts", "Colour options", "Type pairings"],
      },
      {
        name: "Refinement",
        timeframe: "Day 8–12",
        description: "One direction is selected and refined based on feedback. All logo variants, colour codes, and typefaces are finalized.",
        deliverables: ["Final logo suite", "Brand colour system", "Typography guide"],
      },
      {
        name: "Brand Guidelines",
        timeframe: "Day 13–16",
        description: "Complete brand guidelines document covering every usage rule, spacing system, and do/don't example.",
        deliverables: ["PDF brand guide", "Figma design system", "Asset library"],
      },
      {
        name: "Collateral & Handoff",
        timeframe: "Day 17–21",
        description: "All requested collateral designed and delivered. Full source files packaged and handed over.",
        deliverables: ["Print-ready files", "Digital assets", "Source files (AI/Figma)"],
      },
    ],
    techStack: [
      "Figma", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign",
      "Canva Pro", "Framer", "Spline", "Lottie", "After Effects", "Blender",
    ],
    relatedCategories: ["Website Development", "Social Media Management", "Content Creation"],
    pricing: [
      {
        name: "Brand Starter",
        price: "$699",
        timeline: "1–2 weeks",
        features: [
          "Logo (primary + icon variant)",
          "Colour palette",
          "Typography system",
          "2 revision rounds",
          "PNG, SVG, PDF files",
          "Basic brand guidelines (PDF)",
        ],
      },
      {
        name: "Brand System",
        price: "$1,799",
        timeline: "2–3 weeks",
        features: [
          "Full logo suite (all variants)",
          "Complete brand guidelines",
          "Business card + letterhead",
          "Social media templates (6 formats)",
          "Figma design system",
          "3 revision rounds",
          "All source files",
        ],
        highlighted: true,
      },
      {
        name: "Brand + UI/UX",
        price: "$3,499",
        timeline: "3–4 weeks",
        features: [
          "Everything in Brand System",
          "Full UI design (up to 10 screens)",
          "Interactive Figma prototype",
          "User flow documentation",
          "Mobile + desktop designs",
          "Dev handoff assets",
          "Unlimited revisions",
        ],
      },
    ],
    faqs: [
      {
        question: "What do I receive at the end?",
        answer: "All source files in Figma, AI, EPS, SVG, and PNG formats. Plus a PDF brand guidelines document. You own everything — full copyright transfer included.",
      },
      {
        question: "How many logo concepts will I see?",
        answer: "You'll receive 2–3 distinct concept directions in the first presentation. After you choose a direction, we refine through the agreed revision rounds until it's exactly right.",
      },
      {
        question: "Can you redesign an existing brand?",
        answer: "Yes. Rebrands follow the same process with an additional audit phase where we identify what equity to keep from the existing brand and what needs to change.",
      },
      {
        question: "What's the difference between UI design and web development?",
        answer: "UI/UX design is the visual and interaction design phase — Figma files, prototypes, and user flows. Web development is the coding phase where designs are turned into a live site. We offer both as separate or combined services.",
      },
      {
        question: "Can I get just a logo without the full brand system?",
        answer: "Yes, that's our Brand Starter package. However, we always recommend at least a colour palette and typography system alongside the logo so the brand is immediately usable across channels.",
      },
    ],
  },

  // ─── 5. CONTENT CREATION ──────────────────────────────────────────────────
  {
    slug: "content-creation",
    name: "Content Creation",
    headline: ["Content", "Creation"],
    gradientWord: "Content",
    category: "CONTENT CREATION",
    description:
      "Videos, blog articles, social media content, infographics, and copywriting — we produce every piece of content your brand needs to educate, engage, and convert your audience.",
    accentType: "mixed",
    trustIndicators: [
      { text: "Fast turnaround (3–7 days)" },
      { text: "100+ pieces produced" },
    ],
    subServices: [
      "Video Content",
      "Written Content",
      "Social Media Content",
      "Visual Content",
    ],
    whatWeDoIntro:
      "Great content isn't just creative — it's strategic. Every piece we produce is designed with a specific audience, platform, and business goal in mind. From SEO-optimized blog articles to promotional Reels to scroll-stopping infographics, we create content that works.",
    features: [
      { name: "Reels & Shorts", description: "Short-form video optimized for Instagram, YouTube, and TikTok." },
      { name: "Promotional Videos", description: "Product demos, brand films, and service explainer videos." },
      { name: "Blog Articles", description: "SEO-researched, long-form articles that rank and convert." },
      { name: "Website Copywriting", description: "Homepage, services, about, and landing page copy that sells." },
      { name: "Post Captions & Hooks", description: "Platform-native copy written for engagement and reach." },
      { name: "Infographics", description: "Data-rich visual content designed for sharing and authority." },
      { name: "Ad Creatives", description: "Static and video creative assets for paid ad campaigns." },
      { name: "Campaign Content", description: "Full content packages for product launches, events, and promotions." },
    ],
    processSteps: [
      {
        name: "Brief & Research",
        timeframe: "Day 1",
        description: "We understand your brand voice, target audience, content goals, and platform requirements before producing a single asset.",
        deliverables: ["Content brief", "Audience profile", "Keyword/topic research"],
      },
      {
        name: "Content Planning",
        timeframe: "Day 2",
        description: "We map out the content structure — article outline, video script, or visual layout — and share for approval before full production.",
        deliverables: ["Content outlines", "Video scripts", "Visual wireframes"],
      },
      {
        name: "Production",
        timeframe: "Day 3–6",
        description: "Full content production: writing, filming (if applicable), editing, and graphic design. All in your brand's tone and visual style.",
        deliverables: ["Draft content", "Raw designs", "First video cuts"],
      },
      {
        name: "Review & Revisions",
        timeframe: "Day 7",
        description: "You review all content and request any changes. We revise until you're satisfied.",
        deliverables: ["Revised content", "Final review", "Approval sign-off"],
      },
      {
        name: "Delivery",
        timeframe: "Day 7–8",
        description: "Final files delivered in the formats you need — ready to publish, upload, or hand off to your team.",
        deliverables: ["Final files", "Publishing formats", "Asset library"],
      },
    ],
    techStack: [
      "Adobe Premiere Pro", "After Effects", "CapCut", "Canva Pro",
      "Adobe Illustrator", "Figma", "Notion", "Surfer SEO", "ChatGPT (assisted)", "Loom",
    ],
    relatedCategories: ["Social Media Management", "Digital Marketing", "Branding & Design"],
    pricing: [
      {
        name: "Content Pack",
        price: "$499",
        timeline: "1 week",
        features: [
          "5 blog articles (800–1,200 words)",
          "10 social media captions",
          "5 graphic designs",
          "SEO meta titles + descriptions",
          "2 revision rounds",
        ],
      },
      {
        name: "Growth Pack",
        price: "$999/mo",
        timeline: "Monthly",
        features: [
          "8 blog articles (SEO-optimized)",
          "20 social media captions",
          "4 short-form videos (edited)",
          "10 graphic designs",
          "1 promotional video",
          "Unlimited revisions",
        ],
        highlighted: true,
      },
      {
        name: "Full Content Engine",
        price: "Custom",
        timeline: "Let's talk",
        features: [
          "Unlimited content production",
          "Dedicated content strategist",
          "Video production team",
          "Monthly content calendar",
          "Performance tracking",
          "Repurposing workflows",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you write SEO-optimized content?",
        answer: "Yes. All blog articles are researched using tools like Surfer SEO and Ahrefs to identify target keywords, search intent, and optimal structure before a word is written.",
      },
      {
        question: "What if my brand has a specific tone of voice?",
        answer: "We adapt to your brand voice entirely. Share your brand guidelines and any existing content examples — we'll match your tone accurately from day one.",
      },
      {
        question: "Do you handle video filming?",
        answer: "We primarily handle video editing, motion graphics, and animation. If you need filming, we can coordinate with our network of videographers in select cities.",
      },
      {
        question: "Can you repurpose existing content?",
        answer: "Absolutely. Turning a long-form blog post into 5 social posts, a short video, and an infographic is a cost-effective content strategy we build for many clients.",
      },
      {
        question: "How do you handle content rights?",
        answer: "All content produced for you is fully yours. We transfer complete copyright on delivery. We never reuse client content for other projects or portfolios without explicit permission.",
      },
    ],
  },

  // ─── 6. AI & BUSINESS AUTOMATION ─────────────────────────────────────────
  {
    slug: "ai-automation",
    name: "AI & Business Automation",
    headline: ["AI & Business", "Automation"],
    gradientWord: "Automation",
    category: "AI AUTOMATION",
    description:
      "AI receptionists, sales agents, hiring assistants, voice bots, WhatsApp automation, and end-to-end workflow automation — we build the intelligent systems that run your business while you sleep.",
    accentType: "cyan",
    trustIndicators: [
      { text: "Deployed in 1–3 weeks" },
      { text: "20+ automations built" },
    ],
    subServices: [
      "AI Receptionist",
      "AI Customer Support",
      "AI Sales & Lead Generation",
      "AI Voice Assistants",
      "AI Hiring Assistant",
      "AI Business Assistant",
      "AI Appointment Management",
      "Business Process Automation",
      "WhatsApp Automation",
      "AI Analytics & Reporting",
    ],
    whatWeDoIntro:
      "Automation is no longer optional — it's the operating advantage that separates scalable businesses from ones stuck in manual work. We build AI-powered systems across your entire operation: customer support that never sleeps, sales pipelines that qualify leads automatically, hiring workflows that shortlist candidates in seconds, and dashboards that surface insights without a data team.",
    features: [
      { name: "AI Receptionist", description: "24/7 customer support, appointment booking, call handling, and WhatsApp assistance." },
      { name: "AI Sales & Lead Gen", description: "Automated lead capture, qualification, follow-ups, and meeting scheduling." },
      { name: "AI Voice Assistants", description: "Inbound and outbound AI calling for support, surveys, and appointment reminders." },
      { name: "AI Hiring Assistant", description: "Resume screening, candidate shortlisting, and interview scheduling automation." },
      { name: "WhatsApp Automation", description: "Customer engagement, lead nurturing, and automated notifications via WhatsApp." },
      { name: "Business Process Automation", description: "End-to-end workflow automation with CRM, email, and data sync integration." },
      { name: "AI Knowledge Assistant", description: "Internal chatbot that answers employee questions from your SOPs and documents." },
      { name: "AI Analytics & Reporting", description: "Automated business dashboards, performance reports, and customer insights." },
    ],
    processSteps: [
      {
        name: "Process Audit",
        timeframe: "Day 1–2",
        description: "We map your current workflows, identify manual bottlenecks, and prioritize the highest-ROI automation opportunities.",
        deliverables: ["Workflow map", "Automation shortlist", "ROI estimate"],
      },
      {
        name: "Solution Design",
        timeframe: "Day 3–5",
        description: "We design the full automation architecture — AI models, triggers, integrations, fallback logic, and escalation paths.",
        deliverables: ["Architecture diagram", "Integration plan", "Conversation flows"],
      },
      {
        name: "Build & Train",
        timeframe: "Day 6–14",
        description: "We build, configure, and train the AI systems on your data, tone, and business logic. All integrations connected and tested.",
        deliverables: ["Live AI systems", "Trained models", "Integration connections"],
      },
      {
        name: "Testing & QA",
        timeframe: "Day 15–17",
        description: "Full end-to-end testing across all scenarios — real conversations, edge cases, error handling, and fallback flows.",
        deliverables: ["QA report", "Edge case coverage", "Performance benchmarks"],
      },
      {
        name: "Deploy & Monitor",
        timeframe: "Day 18–21",
        description: "Live deployment with monitoring dashboards, team training, and a dedicated support window for the first 30 days.",
        deliverables: ["Live deployment", "Monitoring setup", "Team training"],
      },
    ],
    techStack: [
      "OpenAI GPT-4o", "Anthropic Claude", "LangChain", "n8n", "Make", "Zapier",
      "Vapi (Voice AI)", "Twilio", "WhatsApp Business API", "Supabase", "FastAPI", "Python",
    ],
    relatedCategories: ["Website Development", "Digital Marketing", "Content Creation"],
    pricing: [
      {
        name: "Starter Bot",
        price: "$999",
        timeline: "1–2 weeks",
        features: [
          "1 AI agent (support or sales)",
          "WhatsApp or web integration",
          "Up to 500 conversations/month",
          "Basic analytics dashboard",
          "2 revision rounds",
          "30 days support",
        ],
      },
      {
        name: "Business Suite",
        price: "$2,999",
        timeline: "2–3 weeks",
        features: [
          "3 AI agents (customized)",
          "Multi-channel (WhatsApp + Web + Voice)",
          "CRM integration",
          "Lead qualification workflow",
          "Appointment booking system",
          "Real-time analytics",
          "60 days support",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise AI",
        price: "Custom",
        timeline: "Let's talk",
        features: [
          "Unlimited AI agents",
          "Custom LLM training on your data",
          "Full business process automation",
          "ERP / CRM / HR integrations",
          "Dedicated AI engineer",
          "SLA guarantee",
          "Ongoing model improvements",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need technical knowledge to manage the AI systems?",
        answer: "No. We build everything with non-technical operators in mind. You get a simple dashboard to monitor conversations, view analytics, and update responses — no coding required.",
      },
      {
        question: "What happens when the AI can't answer a question?",
        answer: "We design escalation flows for every system. When the AI hits its knowledge boundary, it transfers the conversation to a human agent or captures contact details for follow-up — zero dead ends.",
      },
      {
        question: "Can you build WhatsApp automation for Indian businesses?",
        answer: "Yes. We build on the official WhatsApp Business API and work with Indian businesses regularly. We handle the API approval process, message templates, and BSP setup on your behalf.",
      },
      {
        question: "How do you train the AI on my business?",
        answer: "We feed the AI your product information, FAQs, pricing, SOPs, and past support conversations. The more context you provide, the more accurately it represents your business.",
      },
      {
        question: "Is my customer data secure?",
        answer: "All data is encrypted in transit and at rest. We follow data privacy best practices and can configure the system to ensure no customer data is stored beyond what you define.",
      },
    ],
  },
];