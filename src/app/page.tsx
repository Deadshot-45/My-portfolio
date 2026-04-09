"use client";

import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import { containerVariants, fadeUpVariants } from "@/components/motion";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Skills from "@/components/Skills";
import { projects } from "@/data/site";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";

// const projects = [
//   {
//     title: "Psych-up - Digital Healthcare",
//     category: "Mental Healthcare",
//     description:
//       "Online therapy and assessments designed for India's pace of life. Psych-up delivers therapist-guided sessions, clinically validated assessments, and personalised care journeys on one secure platform.",
//     image: getAssetUrl("/psychup.png"),
//     link: "https://dev.psychup.health/",
//     tags: ["React.js", "TypeScript", "Tailwind"],
//   },
//   {
//     title: "Vogue-Vault E-commerce",
//     category: "E-commerce",
//     description:
//       "A feature-rich, high-performance E-Commerce platform built with React and Tailwind CSS, offering a premium shopping experience with collections for all ages.",
//     image: getAssetUrl("/e-com.png"),
//     link: "https://vault-vogue-lite.vercel.app/",
//     tags: ["Next.js", "Tailwind", "Express.js"],
//   },
// ];

export default function Home() {
  return (
    <main className="flex-1 w-full relative">
      <Navbar />
      <Hero />

      <About />
      <Experience />
      <Education />
      <Achievements />

      {/* Projects Section */}
      <section
        id="projects"
        className="py-32 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading
            title="Featured Projects"
            subtitle="A curated selection of high-impact digital products I've built from conception to launch."
          />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeUpVariants}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Contact CTA */}
      <section
        id="contact"
        className="py-48 px-6 lg:px-12 text-center overflow-hidden relative scroll-mt-20"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[150px] -z-10 rounded-full" />
        <div className="max-w-3xl mx-auto space-y-12 z-10">
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter">
            Ready to <span className="text-gradient">build</span> the future?
          </h2>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            I&apos;m currently looking for new opportunities and collaborations.
            Let&apos;s create something extraordinary together.
          </p>
          <div className="pt-12 flex flex-wrap items-center justify-center gap-10">
            <a
              href="mailto:mayanksahu8179@gmail.com"
              className="group flex items-center gap-3 text-2xl md:text-4xl font-display font-medium hover:text-accent transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all">
                <Mail className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mayank-sahu-ou"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-2xl md:text-4xl font-display font-medium hover:text-accent transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all">
                <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Deadshot-45/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-2xl md:text-4xl font-display font-medium hover:text-accent transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all">
                <Github className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span>GitHub</span>
            </a>
            <a
              href="/react_mayank_sahu.pdf"
              download="resume_mayank_sahu.pdf"
              className="group flex items-center gap-3 text-2xl md:text-4xl font-display font-medium hover:text-accent transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all">
                <Download className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span>Resume</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800 text-center text-slate-500 text-xs font-medium">
        <p>&copy; 2026 Mayank Sahu - DESIGNED WITH PRECISION</p>
      </footer>
    </main>
  );
}
