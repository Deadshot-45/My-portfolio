'use client';

import { useState } from 'react';
import { createServiceAction, updateServiceAction } from '@/app/cms/actions/services';

interface ServiceFormProps {
  mode: 'create' | 'edit';
  service?: {
    id: string; title: string; slug: string; shortDescription: string | null; description: string | null;
    icon: string | null; features: string | null; displayOrder: number; active: boolean;
    seoTitle: string | null; seoDescription: string | null;
  };
}

export function ServiceForm({ mode, service }: ServiceFormProps) {
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const initial = service ?? { title: '', slug: '', shortDescription: '', description: '', icon: '', features: '', displayOrder: 0, active: true, seoTitle: '', seoDescription: '' };
  const [form, setForm] = useState({
    title: initial.title, slug: initial.slug, shortDescription: initial.shortDescription ?? '', description: initial.description ?? '',
    icon: initial.icon ?? '', features: initial.features ?? '', displayOrder: initial.displayOrder, active: initial.active,
    seoTitle: initial.seoTitle ?? '', seoDescription: initial.seoDescription ?? '',
  });
  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, checked } = e.target as HTMLInputElement & { checked?: boolean };
    setForm((prev) => {
      if (key === 'active') return { ...prev, active: checked ?? prev.active };
      if (key === 'displayOrder') return { ...prev, displayOrder: parseInt(value, 10) || 0 };
      return { ...prev, [key]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    fd.set('title', form.title); fd.set('slug', form.slug); fd.set('shortDescription', form.shortDescription);
    fd.set('description', form.description); fd.set('icon', form.icon); fd.set('features', form.features);
    fd.set('displayOrder', String(form.displayOrder)); fd.set('active', form.active ? 'on' : 'off');
    fd.set('seoTitle', form.seoTitle); fd.set('seoDescription', form.seoDescription);
    try {
      if (mode === 'create') await createServiceAction(fd);
      else { fd.set('id', service!.id); await updateServiceAction(fd); }
    } catch {} finally { setPending(false); }
  };

  return (
    <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-6 md:p-8">
      {serverError && <div className="mb-4 rounded-md bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-200" role="alert">{serverError}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">Title<span className="text-rose-500" aria-hidden="true">*</span></label><input name="title" defaultValue={form.title} required className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">Slug<span className="text-rose-500" aria-hidden="true">*</span></label><input name="slug" defaultValue={form.slug} required className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
        </div>
        <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">Short description</label><textarea name="shortDescription" defaultValue={form.shortDescription} rows={3} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
        <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">Full description</label><textarea name="description" defaultValue={form.description} rows={5} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">Icon (lucide name)</label><input name="icon" defaultValue={form.icon} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">Features (comma-separated)</label><input name="features" defaultValue={form.features} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
        </div>
        <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">SEO title</label><input name="seoTitle" defaultValue={form.seoTitle} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
        <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">SEO description</label><textarea name="seoDescription" defaultValue={form.seoDescription} rows={3} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400">Display order</label><input name="displayOrder" type="number" defaultValue={String(form.displayOrder)} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:ring-1 focus:ring-emerald-500" /></div>
          <div className="h-10 sm:h-11 flex items-center gap-2"><input id="service-active" name="active" type="checkbox" defaultChecked={form.active} className="rounded border-zinc-700 bg-[#09090b] text-emerald-500 focus:ring-emerald-500 h-4 w-4" /><label htmlFor="service-active" className="text-sm text-zinc-300 cursor-pointer">Active (Visible on Portfolio)</label></div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
          <button type="submit" disabled={pending} className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 transition-all">{pending ? 'Saving...' : mode === 'create' ? 'Create Service' : 'Save Changes'}</button>
          <a href="/cms/services" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-zinc-800 text-sm text-zinc-300 hover:bg-zinc-900/50 transition-colors">Cancel</a>
        </div>
      </form>
    </div>
  );
}

