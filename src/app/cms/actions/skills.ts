'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import {
  createSkill,
  deleteSkill,
  getSkillById,
  setSkillActive,
  updateSkill,
} from '@/lib/cms/skills';

function formString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

export async function createSkillAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const name = String(formData.get('name') || '').trim();

  if (!name) {
    throw new Error('Skill name is required.');
  }

  await createSkill({
    name,
    category: formString(formData, 'category') || 'Frontend',
    icon: formString(formData, 'icon'),
    level: formString(formData, 'level') || 'Advanced',
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
    active: formData.get('active') === 'on' || formData.get('active') === 'true',
  });

  revalidatePath('/cms/skills');
  revalidatePath('/');
  redirect('/cms/skills');
}

export async function updateSkillAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const name = String(formData.get('name') || '').trim();

  if (!id || !name) {
    throw new Error('ID and skill name are required.');
  }

  const existing = await getSkillById(id);
  if (!existing) {
    throw new Error('Skill not found.');
  }

  await updateSkill({
    id,
    name,
    category: formString(formData, 'category') || 'Frontend',
    icon: formString(formData, 'icon'),
    level: formString(formData, 'level') || 'Advanced',
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
    active: formData.get('active') === 'on' || formData.get('active') === 'true',
  });

  revalidatePath('/cms/skills');
  revalidatePath('/');
  redirect('/cms/skills');
}

export async function deleteSkillAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  if (id) {
    await deleteSkill(id);
    revalidatePath('/cms/skills');
    revalidatePath('/');
  }
}

export async function setSkillActiveAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const active = formData.get('active') === 'true';
  if (id) {
    await setSkillActive(id, active);
    revalidatePath('/cms/skills');
    revalidatePath('/');
  }
}
