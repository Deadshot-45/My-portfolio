import { defineField, defineType } from 'sanity'

export const seoSettingsType = defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title tag for search engines and social share previews (ideal: 50-60 characters)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Search snippet description (ideal: 140-160 characters)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Target SEO keywords and keyphrases',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Canonical site URL (e.g. https://mayanksahu.dev)',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share (OG) Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Preview image for Twitter, LinkedIn, and messaging platforms (1200x630 recommended)',
    }),
    defineField({
      name: 'ogImageUrl',
      title: 'Social Share Image URL (Fallback)',
      type: 'string',
      description: 'Direct fallback path if no image asset is uploaded (e.g. /images/og-card.png)',
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter / X Handle',
      type: 'string',
      description: 'e.g. @MayankSahu',
    }),
    defineField({
      name: 'robotsIndex',
      title: 'Allow Search Indexing',
      type: 'boolean',
      initialValue: true,
      description: 'Set to false if site should be hidden from search engines',
    }),
  ],
})
