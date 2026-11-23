import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'clientName', title: 'Client Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'company', title: 'Company / Project', type: 'string' }),
    defineField({ name: 'clientDesignation', title: 'Designation / Service Tag', type: 'string' }),
    defineField({ name: 'content', title: 'Review / Quote', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', initialValue: 5 }),
    defineField({ name: 'avatar', title: 'Avatar', type: 'image' }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
})
