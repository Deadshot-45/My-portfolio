import { Project, ProjectCategory } from '../types/index';

export function filterProjectsByCategory(
  projects: Project[],
  category: ProjectCategory
): Project[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}

export function formatInquiryMailto(data: {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
  recipient?: string;
}): string {
  const recipient = data.recipient || 'mayanksahu8179@gmail.com';
  const subject = encodeURIComponent(`Engineering Opportunity / Project Inquiry: ${data.projectType} [${data.name}]`);
  const body = encodeURIComponent(
    `Hi Mayank,\n\nI came across your portfolio and would like to discuss an opportunity / project:\n\n- Name: ${data.name}\n- Email: ${data.email}\n- Focus Area: ${data.projectType}\n- Desired Timeline: ${data.timeline}\n\nMessage / Requirements:\n${data.message}\n\nLooking forward to connecting!\n`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
