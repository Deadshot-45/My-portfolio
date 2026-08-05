"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Award } from "lucide-react";
import { containerVariants, fadeUpVariants } from "./motion";
import SectionHeading from "./SectionHeading";
import { education } from "@/data/site";
import Tilt from "./Tilt";

const iconMap = {
  GraduationCap: <GraduationCap className="w-6 h-6 text-accent" />,
  BookOpen: <BookOpen className="w-6 h-6 text-accent" />,
  Award: <Award className="w-6 h-6 text-accent" />,
};

export default function Education() {
  return (
    <section
      id="education"
      className="py-32 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeading
          title="Academic Foundation"
          subtitle="My educational background providing the analytical and technical scaffolding for my engineering career."
        />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {education.map((edu, index) => {
          const icon = iconMap[edu.icon as keyof typeof iconMap] || <GraduationCap className="w-6 h-6 text-accent" />;
          return (
            <motion.div
              key={edu.institution}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 + index * 0.12 }}
              className="h-full"
            >
              <Tilt className="h-full">
                {/* Outer Bezel Shell */}
                <div className="p-2 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-2xl backdrop-blur-2xl h-full transform-gpu transition-all duration-300 preserve-3d">
                  {/* Inner Core Enclosure */}
                  <div className="bg-[#050912]/80 rounded-[calc(2.5rem-0.5rem)] p-8 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] h-full flex flex-col justify-between" style={{ transformStyle: "preserve-3d" }}>
                    
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors pointer-events-none" />

                    <div className="flex flex-col items-center sm:items-start gap-8 relative z-10 text-center sm:text-left">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-4xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-2xl group-hover:border-accent/40" style={{ transform: "translateZ(20px)" }}>
                        <div className="scale-[1.8] sm:scale-[2]">{icon} </div>
                      </div>

                      <div className="space-y-6 pt-2" style={{ transform: "translateZ(10px)" }}>
                        <div className="space-y-2">
                          <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                            {edu.institution}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <p className="text-accent font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                              {edu.degree}
                            </p>
                            <span className="hidden sm:block text-slate-700">•</span>
                            <p className="text-slate-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                              {edu.field}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-mono text-slate-400 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 w-fit mx-auto sm:mx-0 shadow-inner">
                          <span className="flex items-center gap-2">
                            📅 {edu.period}
                          </span>
                          {edu.grade && (
                            <>
                              <span className="text-slate-700 font-black">|</span>
                              <span className="text-slate-200 font-black tracking-widest">
                                GRADE: {edu.grade}
                              </span>
                            </>
                          )}
                        </div>

                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed italic max-w-xl">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

