'use client';

import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Award,
  Users,
  User,
  Image,
  Github,
  Mail,
  Settings,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/cms/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/cms/projects', icon: FileText },
  { label: 'Services', href: '/cms/services', icon: BarChart3 },
  { label: 'Testimonials', href: '/cms/testimonials', icon: Award },
  { label: 'Clients', href: '/cms/clients', icon: Users },
  { label: 'About Me', href: '/cms/about', icon: User },
  { label: 'Skills & Tech', href: '/cms/skills', icon: Image },
  { label: 'Experience', href: '/cms/experience', icon: Github },
  { label: 'Media Library', href: '/cms/media', icon: Image },
  { label: 'SEO Settings', href: '/cms/seo', icon: Mail },
  { label: 'Website Settings', href: '/cms/settings', icon: Settings },
];
