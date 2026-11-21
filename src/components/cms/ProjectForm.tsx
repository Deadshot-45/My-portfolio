'use client';

import { useState, useEffect } from 'react';
import { createProjectAction, updateProjectAction } from '@/app/cms/actions/projects';
import { Loader2 } from 'lucide-react';
import { ImagePickerInput } from '@/components/cms/ImagePickerInput';
import { CmsSelect } from '@/components/cms/CmsSelect';

export type ProjectFormMode = 'create' | 'edit';

interface ProjectFormProps {
  mode: ProjectFormMode;
  project?: {
    id: string;
    title: string;
    slug: string;
    shortDescription: string | null;
    description: string | null;
    coverImage: string | null;
    category: string | null;
    technologies: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    clientName: string | null;
    duration: string | null;
    featured: boolean;
    displayOrder: number;
    seoTitle: string | null;
    seoDescription: string | null;
    status: string;
  };
}

export function ProjectForm({ mode, project }: ProjectFormProps) {
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const initial = project ?? {
    title: '', slug: '', shortDescription: '', description: '', coverImage: '', category: '',
    technologies: '', liveUrl: '', githubUrl: '', clientName: '', duration: '',
    featured: false, displayOrder: 0, seoTitle: '', seoDescription: '', status: 'DRAFT',
  };

  const [form, setForm] = useState({
    title: initial.title,
    slug: initial.slug,
    shortDescription: initial.shortDescription ?? '',
    description: initial.description ?? '',
    coverImage: initial.coverImage ?? '',
    category: initial.category ?? '',
    technologies: initial.technologies ?? '',
    liveUrl: initial.liveUrl ?? '',
    githubUrl: initial.githubUrl ?? '',
    clientName: initial.clientName ?? '',
    duration: initial.duration ?? '',
    featured: initial.featured,
    displayOrder: initial.displayOrder,
    seoTitle: initial.seoTitle ?? '',
    seoDescription: initial.seoDescription ?? '',
    status: initial.status,
  });

  useEffect(() => {
    if (mode === 'create' && !form.slug) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [mode, form.title]);

  function slugify(text: string): string {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);
    setPending(true);

    const formData = new FormData(event.currentTarget);
    formData.set('title', form.title);
    formData.set('slug', form.slug);
    formData.set('shortDescription', form.shortDescription);
    formData.set('description', form.description);
    formData.set('coverImage', form.coverImage);
    formData.set('category', form.category);
    formData.set('technologies', form.technologies);
    formData.set('liveUrl', form.liveUrl);
    formData.set('githubUrl', form.githubUrl);
    formData.set('clientName', form.clientName);
    formData.set('duration', form.duration);
    formData.set('featured', form.featured ? 'on' : 'off');
    formData.set('displayOrder', String(form.displayOrder));
    formData.set('seoTitle', form.seoTitle);
    formData.set('seoDescription', form.seoDescription);
    formData.set('status', form.status);

    try {
      if (mode === 'create') {
        await createProjectAction(formData);
      } else {
        formData.set('id', project!.id);
        await updateProjectAction(formData);
      }
    } catch {
      // Server actions redirect on success; reaching here means a non-redirect failure.
    } finally {
      setPending(false);
    }
  };

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, type, checked } = event.target as HTMLInputElement & { type?: string; checked?: boolean };
    setForm((prev) => {
      if (key === 'featured') return { ...prev, featured: checked ?? prev.featured };
      if (key === 'displayOrder') return { ...prev, displayOrder: parseInt(value, 10) || 0 };
      return { ...prev, [key]: value };
    });
  };

  return (
    <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-6 md:p-8">
      {serverError && (
        <div className="mb-4 rounded-md bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-200" role="alert">
          {serverError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title" name="title" type="text" required value={form.title} onChange={handleChange('title')} />
          <Field label="Slug" name="slug" type="text" required value={form.slug} onChange={handleChange('slug')} hint="Unique URL identifier" />
        </div>

        <Field label="Short description" name="shortDescription" as="textarea" rows={3} value={form.shortDescription} onChange={handleChange('shortDescription')} />
        <Field label="Full description" name="description" as="textarea" rows={5} value={form.description} onChange={handleChange('description')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Category" name="category" type="text" value={form.category} onChange={handleChange('category')} hint="e.g. Websites, E-commerce" />
          <Field label="Client name" name="clientName" type="text" value={form.clientName} onChange={handleChange('clientName')} hint="e.g. Brass Knuckles Fight Klub" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Live URL" name="liveUrl" type="url" value={form.liveUrl} onChange={handleChange('liveUrl')} />
          <Field label="GitHub URL" name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange('githubUrl')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <ImagePickerInput
            label="Cover image"
            name="coverImage"
            value={form.coverImage}
            onChange={(val) => setForm((prev) => ({ ...prev, coverImage: val }))}
            placeholder="e.g. https://... or /images/..."
          />
          <Field label="Technologies" name="technologies" type="text" value={form.technologies} onChange={handleChange('technologies')} hint="Comma-separated" />
        </div>

        <Field label="SEO title" name="seoTitle" type="text" value={form.seoTitle} onChange={handleChange('seoTitle')} />
        <Field label="SEO description" name="seoDescription" as="textarea" rows={3} value={form.seoDescription} onChange={handleChange('seoDescription')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Field label="Duration" name="duration" type="text" value={form.duration} onChange={handleChange('duration')} hint="e.g. 6 weeks" />
          <div className="h-10 sm:h-11 flex items-center gap-2">
            <input id="featured" name="featured" type="checkbox" checked={form.featured} onChange={handleChange('featured')} className="rounded border-zinc-700 bg-[#09090b] text-emerald-500 focus:ring-emerald-500 h-4 w-4" />
            <label htmlFor="featured" className="text-sm text-zinc-300 cursor-pointer">Featured project</label>
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-xs font-medium text-zinc-400">
              Status
            </label>
            <CmsSelect
              name="status"
              value={form.status}
              onValueChange={(val) => setForm((prev) => ({ ...prev, status: val }))}
              options={[
                { value: 'DRAFT', label: 'Draft' },
                { value: 'PUBLISHED', label: 'Published' },
                { value: 'ARCHIVED', label: 'Archived' },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
          <button type="submit" disabled={pending} className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 transition-all shadow-[0_0_20px_rgba(155,243,90,0.25)]">
            {pending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {mode === 'create' ? 'Create Project' : 'Save Changes'}
          </button>
          <a href="/cms/projects" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-zinc-800 text-sm text-zinc-300 hover:bg-zinc-900/50 transition-colors">Cancel</a>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  as,
  rows,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: 'textarea';
  rows?: number;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-medium text-zinc-400">
        {label}
        {required && <span className="text-rose-500" aria-hidden="true">*</span>}
        {hint && <span className="text-zinc-500 ml-2">({hint})</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          rows={rows ?? 3}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
          className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm leading-relaxed"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
        />
      )}
    </div>
  );
}

