import { Project, ProjectCategory, SkyMode } from '../types/index';

export interface SkySceneConfig {
  mode: SkyMode;
  imageFilter: string;
  atmosphereOverlay: string;
  isDarkText: boolean;
  introScrimBackground: string;
}

export function getSkySceneConfig(mode: SkyMode): SkySceneConfig {
  switch (mode) {
    case 'day':
      return {
        mode: 'day',
        imageFilter: 'brightness(1.08) contrast(0.94) saturate(0.68)',
        atmosphereOverlay:
          'linear-gradient(180deg, rgba(132, 174, 224, 0.44) 0%, rgba(186, 214, 242, 0.28) 46%, rgba(242, 246, 252, 0.14) 100%)',
        isDarkText: true,
        introScrimBackground:
          'radial-gradient(ellipse at 100% 100%, rgba(240, 244, 248, 0.48) 0%, transparent 75%)',
      };
    case 'night':
      return {
        mode: 'night',
        imageFilter: 'brightness(0.38) contrast(1.22) saturate(0.55) hue-rotate(-8deg)',
        atmosphereOverlay:
          'linear-gradient(180deg, rgba(6, 9, 24, 0.64) 0%, rgba(12, 18, 42, 0.42) 55%, rgba(6, 8, 18, 0.72) 100%)',
        isDarkText: false,
        introScrimBackground:
          'radial-gradient(ellipse at 100% 100%, rgba(6, 8, 18, 0.55) 0%, transparent 75%)',
      };
    case 'sunset':
    default:
      return {
        mode: 'sunset',
        imageFilter: 'none',
        atmosphereOverlay:
          'linear-gradient(180deg, rgba(18, 22, 42, 0.2) 0%, rgba(18, 22, 42, 0.06) 28%, rgba(0, 0, 0, 0) 56%)',
        isDarkText: false,
        introScrimBackground:
          'radial-gradient(ellipse at 100% 100%, rgba(22, 18, 28, 0.42) 0%, rgba(22, 18, 28, 0.14) 55%, transparent 80%)',
      };
  }
}

export function filterProjectsByCategory(
  projects: Project[],
  category: ProjectCategory
): Project[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}

export function calculateCaffeinePerk(cups: number): { title: string; perk: string } {
  if (cups < 3) return { title: 'Cold Brew Ignition', perk: 'Smooth code & clean architecture' };
  if (cups < 6) return { title: 'Double Shot Velocity', perk: 'Writing 60 FPS WebGL shaders' };
  if (cups < 10) return { title: 'Triple Ristretto God-Mode', perk: 'Autonomous AI pipelines active' };
  return { title: 'Transcendent Overclock', perk: 'Bypassing laws of quantum computing' };
}

export function formatInquiryMailto(data: {
  name: string;
  email: string;
  projectType: string;
  budgetRange?: string;
  timeline: string;
  message: string;
  recipient?: string;
}): string {
  const recipient = data.recipient || 'mayanksahu8179@gmail.com';
  const subject = encodeURIComponent(`Project Inquiry: ${data.projectType} [${data.name}]`);
  const body = encodeURIComponent(
    `Hi Mayank,\n\nI'd like to discuss a project:\n\n- Name: ${data.name}\n- Email: ${data.email}\n- Project Type: ${data.projectType}\n- Estimated Budget: ${data.budgetRange || '$5,000 - $10,000'}\n- Desired Timeline: ${data.timeline}\n\nProject Details:\n${data.message}\n\nLooking forward to speaking!`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
