import { defineField, defineType } from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Profile / Bio',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'headline', title: 'Headline / Role', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio / Summary', type: 'text' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'avatar', title: 'Avatar Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'statusText', title: 'Availability Status Text', type: 'string' }),
    defineField({ name: 'availableForWork', title: 'Available for Work', type: 'boolean', initialValue: true }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'label', title: 'Display Label', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
