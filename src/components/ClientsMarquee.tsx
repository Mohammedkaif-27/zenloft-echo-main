const clients = [
  "CHRONOS", "APEX GYM", "PROSE.AI", "PRESTIGE PROPERTIES", "NOVA ECLIPSE",
  "MINT PROTOCOL", "SERENIQ", "NEXCHAIN", "AURA SKIN", "DATASTREAM",
  "OSSO", "LEARNFLOW", "TERRA WILD", "THE AURUM RESORT", "DIGITALVAULT",
  "DRXP CULTURE", "CLARITY HEALTH", "FRAME AND SHADOW", "NEXUS API", "VOXEL STUDIO",
];

const ClientsMarquee = () => {
  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <p className="font-space text-[11px] text-muted-foreground tracking-[0.2em] text-center mb-10 uppercase">
        Featured Projects
      </p>
      <div className="group">
        <div
          className="flex animate-marquee-slow hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="font-clash font-bold text-xl text-muted-foreground hover:text-foreground transition-colors px-4 cursor-default">
                {c}
              </span>
              <span className="w-1.5 h-1.5 bg-primary rotate-45 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
