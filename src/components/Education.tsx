"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import { containerVariants, fadeUpVariants } from "./motion";
import SectionHeading from "./SectionHeading";

const education = [
  {
    institution: "Oriental University",
    degree: "Master of Computer Applications - MCA",
    field: "Computer Application",
    period: "Jul 2022 - Aug 2024",
    description:
      "A postgraduate degree focusing on advanced computer science concepts, software development, and IT management, preparing graduates for diverse roles in the tech industry.",
    icon: <GraduationCap className="w-6 h-6 text-accent" />,
  },
  {
    institution: "Zakir Husain Delhi College, University of Delhi",
    degree: "Bachelor's degree",
    field: "Mathematics + Economics",
    period: "2019 - 2022",
    description:
      "Foundation in analytical and quantitative skills, bridging mathematical logic with economic principles. This background enhances logical problem-solving and structured thinking in software development.",
    grade: "6.7 CGPA",
    icon: <BookOpen className="w-6 h-6 text-accent" />,
  },
];

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

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {education.map((edu, index) => (
          <motion.div
            key={edu.institution}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 + index * 0.12 }}
            className="group relative glass p-8 rounded-4xl border-slate-800/50 hover:border-accent/40 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10 text-center sm:text-left">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-4xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-2xl group-hover:border-accent/40">
                <div className="scale-[1.8] sm:scale-[2]">{edu.icon} </div>
              </div>

              <div className="space-y-6 pt-2">
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
