import { defineField, defineType } from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Role Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'company', title: 'Company / Studio', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'employmentType', title: 'Employment Type', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'period', title: 'Period (e.g. Nov 2024 – Feb 2025)', type: 'string' }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'date' }),
    defineField({ name: 'endDate', title: 'End Date', type: 'date' }),
    defineField({ name: 'current', title: 'Currently Working Here', type: 'boolean', initialValue: false }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'highlights', title: 'Key Highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'technologies', title: 'Technologies', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
})
