"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { containerVariants, fadeUpVariants } from "./motion";
import Tilt from "./Tilt";

const achievements = [
  {
    title: "State Level Chess Athlete",
    organization: "Madhya Pradesh Sports Ministry",
    period: "School Years",
    description:
      "Competed at the state level in chess tournaments, developing strategic thinking, patience, and analytical problem-solving skills from an early age.",
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    color: "from-yellow-500/10 to-transparent",
  },
  {
    title: "Master of Computer Applications",
    organization: "Oriental University",
    period: "Class of 2024",
    description:
      "Successfully completed postgraduate studies with a focus on advanced computing and software engineering principles.",
    icon: <Star className="w-8 h-8 text-blue-500" />,
    color: "from-blue-500/10 to-transparent",
  },
  {
    title: "Strategic Problem Solving",
    organization: "Core Competency",
    period: "Ongoing",
    description:
      "Leveraging the tactical discipline of competitive chess to architect complex frontend solutions and scalable backend systems.",
    icon: <Target className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-500/10 to-transparent",
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-32 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeading
          title="Distinctions & Milestones"
          subtitle="Beyond the code: A look at the competitive spirit and academic foundation that drive my professional excellence."
        />
      </motion.div>

      <div className="grid md:grid-cols-5 gap-8">
        {achievements.map((item, index) => {
          const gridSpans = ["md:col-span-2", "md:col-span-3", "md:col-span-5"];
          const span = gridSpans[index] || "md:col-span-1";
          return (
            <motion.div
              key={item.title}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className={`h-full ${span}`}
            >
              <Tilt className="h-full">
                {/* Outer Bezel Shell */}
                <div className="p-2 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-2xl backdrop-blur-2xl h-full transform-gpu transition-all duration-300 preserve-3d">
                  {/* Inner Core Enclosure */}
                  <div className="bg-[#050912]/80 rounded-[calc(2.5rem-0.5rem)] p-8 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] h-full flex flex-col justify-between" style={{ transformStyle: "preserve-3d" }}>
                    
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />

                    <div className="relative z-10 space-y-6 text-center md:text-left" style={{ transform: "translateZ(10px)" }}>
                      <div className="w-16 h-16 mx-auto md:mx-0 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                        {item.icon}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-display font-black text-white group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex flex-col gap-1 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                          <span className="text-accent/80">{item.organization}</span>
                          <span>{item.period}</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                        {item.description}
                      </p>
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
