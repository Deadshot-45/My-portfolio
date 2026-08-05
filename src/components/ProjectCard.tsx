"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { fadeUpVariants } from "./motion";
import Tilt from "./Tilt";

interface ProjectCardProps {
  readonly title: string;
  readonly category: string;
  readonly longDescription: string;
  readonly image: string;
  readonly tags: readonly string[];
  readonly link?: string;
}

export default function ProjectCard({
  title,
  category,
  longDescription,
  image,
  tags,
  link,
}: ProjectCardProps) {
  const handleClick = () => {
    if (link) {
      globalThis.window?.open(link, "_blank");
    }
  };

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative cursor-pointer h-full"
      onClick={handleClick}
    >
      <Tilt className="w-full h-full">
        {/* Outer Bezel Shell */}
        <div className="p-2 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-2xl backdrop-blur-2xl h-full transform-gpu transition-all duration-300 preserve-3d">
          
          {/* Inner Core Enclosure */}
          <div className="bg-[#050912]/80 rounded-[calc(2.5rem-0.5rem)] p-6 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] h-full flex flex-col justify-between" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Image Box */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800/80 p-1 bg-white/5" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
              <div className="w-full h-full rounded-[calc(1.5rem-0.25rem)] overflow-hidden relative transform-gpu">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="absolute top-6 right-6 w-10 h-10 bg-accent rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-accent/20" style={{ transform: "translateZ(30px)" }}>
                <ArrowUpRight className="w-5 h-5 text-slate-950" />
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-4 px-2" style={{ transform: "translateZ(10px)" }}>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-display font-black uppercase tracking-[0.2em] text-accent/80 bg-accent/5 border border-accent/10 px-3 py-1 rounded-full">
                  {category}
                </span>
                <div className="h-px flex-1 bg-slate-800/40" />
              </div>

              <h3 className="text-2xl font-display font-black tracking-tight text-white group-hover:text-accent transition-colors">
                {title}
              </h3>

              <p className="text-slate-400 text-xs leading-relaxed">
                {longDescription}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono font-bold text-slate-500 border border-slate-800/50 px-2 py-0.5 rounded-lg bg-slate-950/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}
