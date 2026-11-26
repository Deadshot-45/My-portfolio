import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MapPin, Flag, Sparkles, Compass } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  description: string;
  align: "left" | "right";
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Step 1: The Starting Point",
    description:
      "Every great journey begins with a single step down the winding path.",
    align: "left",
    icon: <Compass className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 2,
    title: "Step 2: Crossing the Valley",
    description:
      "As you scroll, the road reveals itself and unlocks key details along the way.",
    align: "right",
    icon: <MapPin className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 3,
    title: "Step 3: Climbing the Ridge",
    description:
      "Smooth spring physics ensure the path feels organic and responsive.",
    align: "left",
    icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 4,
    title: "Step 4: Reaching the Destination",
    description: "You have arrived at the end of the interactive roadmap.",
    align: "right",
    icon: <Flag className="w-5 h-5 text-emerald-600" />,
  },
];

export default function WalkingRoad() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Optional: Move a "walker" dot along the vertical axis in sync
  const walkerY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-24 px-4">
      {/* Winding SVG Road Background */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <svg
          className="w-full max-w-md h-full"
          viewBox="0 0 200 800"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Base Grey Track (Unwalked Road) */}
          <path
            d="M 100 0 C 180 150, 20 250, 100 400 C 180 550, 20 650, 100 800"
            stroke="#E5E7EB"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Animated Colored Road (Walked Path) */}
          <motion.path
            d="M 100 0 C 180 150, 20 250, 100 400 C 180 550, 20 650, 100 800"
            stroke="#10B981"
            strokeWidth="12"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
          />

          {/* Center Dashed Road Markings */}
          <path
            d="M 100 0 C 180 150, 20 250, 100 400 C 180 550, 20 650, 100 800"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      {/* Milestone Cards */}
      <div className="relative z-10 space-y-32">
        {milestones.map((item) => {
          const isLeft = item.align === "left";

          return (
            <div
              key={item.id}
              className={`flex items-center w-full ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full md:w-5/12 bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
