import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { projects } from "@/data/projectsData";
import { useSEO } from "@/hooks/useSEO";

const Works = () => {
  useSEO({
    title: "Case Studies & Projects | Zenloft Studio",
    description: "Explore Zenloft Studio's curated collection of concept projects, case studies, and demonstration builds showcasing our design and engineering capabilities.",
    ogUrl: "https://zenloftstudio.online/works",
  });

  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-space text-xs text-muted-foreground hover:text-primary transition-colors mb-12 min-h-[44px] py-2"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-clash font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground mb-4"
          >
            Case Studies & Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-satoshi text-muted-foreground text-lg max-w-xl mb-8 md:mb-12"
          >
            A curated collection of concept projects, case studies, and demonstration builds that showcase our design and engineering capabilities.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-10 md:mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-space text-xs px-4 py-2 rounded-full border transition-all duration-200 min-h-[44px] ${
                  activeCategory === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-[rgba(255,255,255,0.1)] text-muted-foreground hover:border-[rgba(255,255,255,0.3)] hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
              >
                <Link
                  to={`/works/${project.slug}`}
                  className="group relative block rounded-lg overflow-hidden aspect-[4/3] cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  
                  {/* Project Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="font-space text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border bg-background/80 backdrop-blur-sm"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                      }}
                    >
                      {project.projectType}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="font-space text-[10px] text-primary uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h2 className="font-clash font-bold text-2xl text-foreground mt-1 flex items-center gap-2">
                      {project.name}
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </h2>
                    <p className="font-satoshi text-sm text-muted-foreground mt-1">
                      {project.tag}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Works;
