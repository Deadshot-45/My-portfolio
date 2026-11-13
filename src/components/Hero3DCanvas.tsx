'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SkyMode } from '../types/index';

interface Hero3DCanvasProps {
  skyMode: SkyMode;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ skyMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 800;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Subtle atmospheric dust motes (day/sunset) or crisp night starfield (night)
    const particleCount = skyMode === 'night' ? 320 : 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const palette =
      skyMode === 'night'
        ? [new THREE.Color(0xe2e8f0), new THREE.Color(0xfffaf3), new THREE.Color(0x93c5fd)]
        : skyMode === 'sunset'
        ? [new THREE.Color(0xfff1dc), new THREE.Color(0xfcd39a), new THREE.Color(0xf6b8a0)]
        : [new THREE.Color(0xffffff), new THREE.Color(0xeef6ff), new THREE.Color(0xddeeff)];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      speeds[i] = 0.25 + Math.random() * 0.6;

      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft circular radial texture so particles never render as sharp square pixels
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 32;
    spriteCanvas.height = 32;
    const sCtx = spriteCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.75)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 32, 32);
    }
    const pointTexture = new THREE.CanvasTexture(spriteCanvas);

    const material = new THREE.PointsMaterial({
      size: skyMode === 'night' ? 0.055 : 0.075,
      map: pointTexture,
      vertexColors: true,
      transparent: true,
      opacity: skyMode === 'night' ? 0.72 : 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.28;
      targetY = -(event.clientY / window.innerHeight - 0.5) * 0.18;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('resize', handleResize);

    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;

      if (!prefersReducedMotion) {
        const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          const y = posAttr.getY(i) + 0.0012 * speeds[i];
          posAttr.setY(i, y > 3.25 ? -3.25 : y);
        }
        posAttr.needsUpdate = true;
        points.rotation.z = Math.sin(elapsed * 0.05) * 0.03;
      }

      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pointTexture.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [skyMode]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      aria-hidden="true"
    />
  );
};
