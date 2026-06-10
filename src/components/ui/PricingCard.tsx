import { motion } from "framer-motion";

export interface PricingCardProps {
  service: string;
  price: string;
}

export const PricingCard = ({ service, price }: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.15)] rounded-xl p-4 flex flex-col gap-1 shadow-[0_0_15px_rgba(0,229,255,0.05)] w-full relative overflow-hidden group"
    >
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 rounded-full bg-primary/20 blur-[20px] group-hover:bg-primary/30 transition-colors" />
      
      <span className="font-space font-semibold text-[10px] text-primary uppercase tracking-widest relative z-10">
        {service}
      </span>
      <span className="font-clash font-semibold text-lg text-foreground relative z-10 mt-1">
        {price}
      </span>
    </motion.div>
  );
};
