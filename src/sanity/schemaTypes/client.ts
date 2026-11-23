import { defineField, defineType } from 'sanity'

export const clientType = defineType({
  name: 'client',
  title: 'Clients & Brands',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client / Brand Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({ name: 'category', title: 'Category / Tagline', type: 'string' }),
    defineField({ name: 'websiteUrl', title: 'Website URL', type: 'url' }),
    defineField({ name: 'logo', title: 'Logo Asset', type: 'image' }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
})
