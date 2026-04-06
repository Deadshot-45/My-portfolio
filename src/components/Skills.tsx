"use client";

import { motion } from "framer-motion";
import { Atom, Code2, Cpu, FileJson, Layers, Palette } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { containerVariants, fadeUpVariants, scaleInVariants } from "./motion";

const detailedSkills = [
  {
    title: "HTML",
    icon: <Code2 className="w-8 h-8 text-emerald-400" />,
    points: [
      "Proficient in HTML5 for creating and structuring web content.",
      "Formatted and styled web pages using HTML tags and attributes.",
      "Semantic and Non-Semantics HTML elements for better accessibility.",
    ],
    color: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-orange-500/20",
  },
  {
    title: "CSS / Tailwind CSS",
    icon: <Palette className="w-8 h-8 text-blue-400" />,
    points: [
      "Skilled in using CSS to style web pages and create layouts.",
      "Experienced in using Tailwind CSS for utility-first CSS framework.",
      "Creating responsive designs with media queries and Flexbox/Grid.",
    ],
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/20",
  },
  {
    title: "JavaScript",
    icon: <FileJson className="w-8 h-8 text-yellow-400" />,
    points: [
      "Proficient in vanilla JavaScript for interactive web functionalities.",
      "Familiar with ES6+ features like let/const, arrow functions, and promises.",
      "Experience with DOM manipulation and event handling.",
    ],
    color: "from-yellow-500/20 to-yellow-500/5",
    borderColor: "border-yellow-500/20",
  },
  {
    title: "React JS",
    icon: <Atom className="w-8 h-8 text-cyan-400" />,
    points: [
      "Creating dynamic web applications with React components.",
      "Utilizing state and props for data management in React.",
      "Experience with React hooks for functional components.",
    ],
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/20",
  },
  {
    title: "TypeScript",
    icon: <Cpu className="w-8 h-8 text-blue-500" />,
    points: [
      "Enhancing code quality with static typing and advanced TS features.",
      "Developing type-safe React components and custom hooks.",
      "Leveraging interfaces and types for robust data structures.",
    ],
    color: "from-blue-600/20 to-blue-600/5",
    borderColor: "border-blue-600/20",
  },
  {
    title: "Next.js",
    icon: <Layers className="w-8 h-8 text-white" />,
    points: [
      "Building SEO-friendly apps with Server Components and App Router.",
      "Optimizing performance with Server-Side Rendering and static generation.",
      "Implementing API routes and middleware for full-stack functionality.",
    ],
    color: "from-slate-500/20 to-slate-500/5",
    borderColor: "border-slate-500/20",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-32 px-6 lg:px-12 bg-slate-900/30 border-y border-slate-900 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading
            title="Technical Arsenal"
            subtitle="My expertise across the core web technologies, from structure to logic."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className={`group relative glass p-8 rounded-[2.5rem] border ${skill.borderColor} bg-slate-950/40 transition-all duration-500 overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {skill.icon}
                  </div>
                  <h3 className="text-3xl font-display font-black text-white">
                    {skill.title}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {skill.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors"
                    >
                      <span className="text-emerald-500 font-bold">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 pt-20 border-t border-slate-900">
          <motion.h3
            variants={scaleInVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="text-xl font-display font-black text-slate-300 uppercase tracking-[0.2em] text-center mb-10 italic"
          >
            Tools & Backend Foundation
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Node.js", icon: "🌐" },
              { name: "Express.js", icon: "🚀" },
              { name: "SQL", icon: "📊" },
              { name: "MongoDB", icon: "🍃" },
              { name: "Git", icon: "🌿" },
              { name: "GitHub", icon: "🐙" },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="glass p-6 text-center rounded-3xl hover:border-accent/40 group transition-all duration-300 bg-slate-950/20"
              >
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-500">
                  {skill.icon}
                </div>
                <h4 className="font-bold text-sm mb-1">{skill.name}</h4>
                <p className="text-[10px] text-accent font-bold uppercase tracking-widest opacity-60">
                  Core Tool
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
