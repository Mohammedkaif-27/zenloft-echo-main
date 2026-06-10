import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projectsData";

const ProjectCard = ({ name, tag, image, slug }: { name: string; tag: string; image: string; slug: string }) => (
  <Link
    to={`/works/${slug}`}
    className="group relative flex-shrink-0 w-[240px] h-[180px] sm:w-[280px] sm:h-[220px] md:w-[380px] md:h-[280px] rounded-lg overflow-hidden block"
    style={{ marginRight: 16 }}
    data-cursor="project"
  >
    <img
      src={image}
      alt={name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      loading="lazy"
    />
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(4,5,10,0.9)] to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
      <div>
        <h3 className="font-clash font-bold text-xl md:text-2xl text-foreground">{name}</h3>
        <p className="font-space text-[11px] text-muted-foreground mt-1">{tag}</p>
      </div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.1)] transition-all duration-200 group-hover:bg-primary group-hover:border-primary">
        <ArrowUpRight size={20} className="text-foreground group-hover:text-primary-foreground transition-colors" />
      </div>
    </div>
  </Link>
);

const ProjectsSection = () => {
  const allCards = [...projects, ...projects];

  return (
    <section id="works" className="py-10 md:py-16 overflow-hidden">
      <div className="marquee-strip flex" style={{ width: "max-content" }}>
        {allCards.map((p, i) => (
          <ProjectCard key={i} name={p.name} tag={p.tag} image={p.image} slug={p.slug} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
