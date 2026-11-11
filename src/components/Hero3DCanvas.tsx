'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for rotation
    const group = new THREE.Group();
    scene.add(group);

    // 1. Particle Cloud Sphere
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x06b6d4); // Cyan
    const color2 = new THREE.Color(0x8b5cf6); // Violet
    const color3 = new THREE.Color(0x10b981); // Emerald

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = 1.6 + (Math.random() - 0.5) * 0.45;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color interpolation
      const mixRatio = (y + 1.8) / 3.6;
      const pointColor = new THREE.Color();
      if (mixRatio < 0.5) {
        pointColor.lerpColors(color1, color2, mixRatio * 2);
      } else {
        pointColor.lerpColors(color2, color3, (mixRatio - 0.5) * 2);
      }

      colors[i * 3] = pointColor.r;
      colors[i * 3 + 1] = pointColor.g;
      colors[i * 3 + 2] = pointColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    group.add(particles);

    // 2. Inner Wireframe Core (Icosahedron)
    const innerGeo = new THREE.IcosahedronGeometry(1.05, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireframeMesh = new THREE.Mesh(innerGeo, wireframeMat);
    group.add(wireframeMesh);

    // 3. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia rotation to mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y = elapsedTime * 0.18 + mouseX;
      group.rotation.x = elapsedTime * 0.12 + mouseY;

      wireframeMesh.rotation.y = -elapsedTime * 0.22;
      wireframeMesh.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2;

      // Pulse particle size gently
      const pulse = Math.sin(elapsedTime * 1.5) * 0.005 + 0.038;
      particleMaterial.size = pulse;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      innerGeo.dispose();
      wireframeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center">
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-violet-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      {/* Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-dark-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-400 flex items-center gap-2 pointer-events-none shadow-xl">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Interactive WebGL 3D • Drag & Hover</span>
      </div>
    </div>
  );
};
