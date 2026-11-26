'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 22, skewY: 4 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const CraftSection: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Torusknot matching reference 3D model
    const geometry = new THREE.TorusKnotGeometry(0.85, 0.26, 120, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0f0f0f,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      mesh.rotation.x = elapsedTime * 0.2;
      mesh.rotation.y = elapsedTime * 0.3;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="craft"
      data-surface="white"
      aria-labelledby="craft-title"
      className="relative z-10 w-full min-h-[90svh] bg-white text-[#0f0f0f] px-[4vw] md:px-[var(--page-x)] py-20 md:py-28 flex flex-col justify-between overflow-hidden border-t border-[#0f0f0f]/10"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left: Interactive 3D Model Stage */}
        <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
          <div
            ref={canvasRef}
            className="w-full max-w-[420px] aspect-square relative flex items-center justify-center"
            aria-hidden="true"
          />
        </div>

        {/* Right: Signature Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col max-w-xl order-1 lg:order-2">
          <motion.h2
            id="craft-title"
            className="font-grotesk text-[clamp(2.5rem,6.5vw,5.5rem)] font-light leading-[1] tracking-[-0.035em] text-[#0f0f0f] m-0"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="block overflow-hidden">
              {"Where Code".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden font-normal">
              {"Meets Art.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          <div className="mt-8 pt-6 border-t border-[#0f0f0f]/15">
            <p className="font-grotesk text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.45] text-[#0f0f0f]/80 m-0">
              I sketch your site by hand, then build it in code myself. What you approve on paper is exactly what goes live.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-6 font-mono text-xs text-[#0f0f0f]/50">
            <span>React 19 / WebGL</span>
            <span>·</span>
            <span>Three.js Shaders</span>
            <span>·</span>
            <span>Sub-second TTFB</span>
          </div>
        </div>

      </div>

      <footer className="relative z-10 pt-6 border-t border-[#0f0f0f]/10 flex items-center justify-between font-mono text-xs text-[#0f0f0f]/50">
        <span>Kinetic Architecture</span>
        <span>Zero Page Builder Bloat</span>
      </footer>
    </section>
  );
};
