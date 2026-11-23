import { defineField, defineType } from 'sanity'

export const skillType = defineType({
  name: 'skill',
  title: 'Skills & Tech',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category Group',
      type: 'string',
      description: 'e.g. Frontend & UI Systems, State & Data Layer, Backend & Real-Time, Databases & Caching, DevOps & Tooling',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Individual technologies or libraries in this group',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
