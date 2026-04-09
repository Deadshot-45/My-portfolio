"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { fadeUpVariants } from "./motion";

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
      className="group relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-slate-800/50 glass p-2">
        <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative transform-gpu">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        <div className="absolute top-8 right-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-accent/20">
          <ArrowUpRight className="w-6 h-6 text-slate-950" />
        </div>
      </div>

      <div className="mt-8 space-y-4 px-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80 bg-accent/5 border border-accent/10 px-3 py-1 rounded-full">
            {category}
          </span>
          <div className="h-px flex-1 bg-slate-800/50" />
        </div>

        <h3 className="text-3xl font-display font-black tracking-tight text-white group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
          {longDescription}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono font-bold text-slate-500 border border-slate-800/50 px-3 py-1 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
