"use client";

import { motion } from "framer-motion";
import { containerVariants, fadeUpVariants } from "./motion";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    role: "React Developer",
    company: "LincPay",
    type: "Internship",
    period: "Dec 2025 - Present",
    location: "Bhopal, Madhya Pradesh, India",
    details: [
      "Implementing new, reusable UI components based on design specifications.",
      "Working on minor features and bug fixes in existing applications.",
      "Writing basic unit or integration tests for components.",
      "Updating and creating technical documentation for the codebase.",
    ],
    isCurrent: true,
  },
  {
    role: "Senior Supervisor IT",
    company: "TCIExpress Ltd",
    type: "Full-time",
    period: "Apr 2025 - Dec 2025",
    location: "Chennai, Tamil Nadu, India",
    details: [
      "Managed IT infrastructure and performed hardware/software troubleshooting to ensure 99% system uptime.",
      "Streamlined workstation security updates and optimized system performance across user departments.",
    ],
    isCurrent: false,
  },
  {
    role: "Training - MERN Stack",
    company: "JSpiders",
    type: "Training & Development",
    period: "Sep 2024 - Mar 2025",
    location: "Bengaluru, India",
    details: [
      "Mastering MongoDB, Express.js, React, and Node.js in a rigorous development program.",
      "Developed deep proficiency in HTML5, CSS3, and modern JavaScript (ES6+).",
      "Building full-stack applications with a focus on scalable architecture.",
    ],
    isCurrent: false,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-32 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeading
          title="Professional Journey"
          subtitle="A timeline of my growth, technical contributions, and professional milestones."
        />
      </motion.div>

      <div className="relative space-y-12">
        <div className="absolute left-0 lg:left-1/2 top-4 bottom-4 w-px bg-slate-800 -translate-x-1/2 hidden lg:block" />

        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.15 + index * 0.12 }}
            className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-24 relative ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="absolute left-0 lg:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 z-10 border-4 border-slate-950 hidden lg:block shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

            <div className="w-full lg:w-1/2 space-y-4 group">
              <div
                className={`glass p-8 rounded-4xl border-slate-800/50 hover:border-accent/30 transition-all duration-500 relative overflow-hidden ${
                  exp.isCurrent ? "bg-accent/5 ring-1 ring-accent/20" : ""
                }`}
              >
                {exp.isCurrent && (
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 blur-[60px] rounded-full" />
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-black text-white">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-accent font-bold text-sm tracking-widest uppercase">
                        {exp.company}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-500 text-xs font-semibold uppercase">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                      {exp.period}
                    </span>
                    <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest">
                      {exp.location}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-slate-400 text-sm leading-relaxed flex gap-3"
                    >
                      <span className="text-accent shrink-0 mt-1.5">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/2" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
