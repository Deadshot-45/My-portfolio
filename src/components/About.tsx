"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { containerVariants, fadeUpVariants, scaleInVariants } from "./motion";
import SectionHeading from "./SectionHeading";
import { Award, Target, Trophy } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeading
          title="About Me"
          subtitle="Driven by a passion for clean code and exceptional user experiences."
        />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-linear-to-r from-emerald-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative aspect-square rounded-4xl overflow-hidden border border-slate-800/50 shadow-2xl glass">
            <Image
              src="/profile.png"
              alt="Mayank Sahu"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between gap-4">
              <div className="glass px-4 py-2 rounded-xl backdrop-blur-3xl border-slate-700/50">
                <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Experience
                </span>
                <span className="text-white font-black text-sm uppercase italic">
                  Developer Graduate
                </span>
              </div>
              <div className="glass px-4 py-2 rounded-xl backdrop-blur-3xl border-slate-700/50">
                <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Education
                </span>
                <span className="text-white font-black text-sm uppercase italic">
                  MCA 2024
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.18 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-display font-black text-white leading-tight italic">
              &quot;Transforming <span className="text-gradient">Ideas</span>{" "}
              into Digital Reality.&quot;
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              I<span>&apos;m</span>{" "}
              <span className="text-white font-bold">Mayank Sahu</span>, a
              Front-End Web Developer and graduate. I specialize in building
              high-performance, interactive web applications using modern
              technologies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Strategic Thinking",
                desc: "Solving problems at their core.",
                icon: <Target className="w-5 h-5" />,
              },
              {
                title: "Chess Athlete",
                desc: "State level tournament player since school time (Madhya Pradesh Sports Ministry).",
                icon: <Trophy className="w-5 h-5" />,
              },
              {
                title: "Modern Stack",
                desc: "Next.js, TS & Framer Motion.",
                icon: <Award className="w-5 h-5" />,
              },
              {
                title: "MCA Graduate",
                desc: "Class of 2024 with technical excellence.",
                icon: <Award className="w-5 h-5" />,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={scaleInVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="glass p-4 rounded-2xl border-slate-800/50 hover:border-accent/30 transition-colors group/card"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-accent">{item.icon}</div>
                  <div className="text-white font-bold text-sm tracking-tight group-hover/card:translate-x-1 transition-transform">
                    {item.title}
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-tighter opacity-60 font-medium">
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-slate-400 leading-relaxed text-sm">
            My expertise spans{" "}
            <span className="text-slate-100 italic">
              HTML, CSS, JavaScript, and React.js
            </span>
            , with a strong foundation in{" "}
            <span className="text-slate-100">Express.js and RESTful APIs</span>.
            Beyond code, I apply the same strategic discipline I learned from
            competitive chess to technical problem solving.
          </p>

          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center gap-8"
          >
            <div>
              <p className="text-white font-black text-xl font-display italic">
                Let&apos;s build together!
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                Available for new opportunities
              </p>
            </div>
            <a
              href="#contact"
              className="px-8 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 hover:text-accent transition-all shadow-xl"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
