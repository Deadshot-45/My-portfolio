'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ThemeMode } from '../types/index';
import { Code2, Cpu, CheckCircle2 } from 'lucide-react';

interface CraftSectionProps {
  theme: ThemeMode;
}

export const CraftSection: React.FC<CraftSectionProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Torus knot with glowing wireframe
    const geometry = new THREE.TorusKnotGeometry(0.85, 0.28, 100, 16);
    const material = new THREE.MeshBasicMaterial({
      color: isDark ? 0x06b6d4 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.65,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      mesh.rotation.x = elapsedTime * 0.25;
      mesh.rotation.y = elapsedTime * 0.35;
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
  }, [isDark]);

  return (
    <section id="architecture" className={`py-24 border-t relative overflow-hidden ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50/70'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6 ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}>
              Precision Engineering.
              <span className={`block font-normal mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                From schema to 60fps UI.
              </span>
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed max-w-xl mb-8 ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              I own the full lifecycle of a feature: drafting database schemas (PostgreSQL / MongoDB), establishing type-safe contracts with TypeScript, and constructing atomic component libraries in React 19 that run at 60fps without layout jank.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <div className={`p-5 rounded-2xl border ${
                isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <Code2 className="w-5 h-5 text-sky-500 mb-2" />
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  Atomic Design Hierarchy
                </h4>
                <p className={`text-xs mt-1 leading-normal ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Isolated, testable components accelerating feature turnaround by 20%.
                </p>
              </div>

              <div className={`p-5 rounded-2xl border ${
                isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <Cpu className="w-5 h-5 text-emerald-500 mb-2" />
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  WebGL & Interactive Graphics
                </h4>
                <p className={`text-xs mt-1 leading-normal ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Three.js rendering pipelines with responsive GPU fallback budgets.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className={`w-full max-w-[380px] h-[380px] rounded-3xl border flex items-center justify-center relative shadow-xl overflow-hidden ${
              isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <div ref={canvasRef} className="w-full h-full" />
              <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-md border text-[11px] font-mono ${
                isDark ? 'bg-zinc-950/80 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
              }`}>
                WebGL Torusknot · Three.js
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
