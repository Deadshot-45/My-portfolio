import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Website Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Mayank Sahu Portfolio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Creative Full-Stack Developer & Designer',
    }),
    defineField({
      name: 'primaryEmail',
      title: 'Primary Contact Email',
      type: 'string',
      initialValue: 'mayanksahu8179@gmail.com',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '+91 93019 09040',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Indore, Madhya Pradesh, India',
    }),
    defineField({
      name: 'availableForWork',
      title: 'Available for Work',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'availabilityText',
      title: 'Availability Badge Text',
      type: 'string',
      initialValue: 'Available for Q1/Q2 contracts & high-impact full-stack roles',
    }),
    defineField({
      name: 'defaultSkyMode',
      title: 'Default Sky Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Sunset (Orange / Warm)', value: 'sunset' },
          { title: 'Dawn (Purple / Violet)', value: 'dawn' },
          { title: 'Noon (Cyan / Bright)', value: 'noon' },
          { title: 'Midnight (Dark Stars)', value: 'midnight' },
        ],
      },
      initialValue: 'sunset',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Profile URL',
      type: 'url',
      initialValue: 'https://github.com/Deadshot-45',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn Profile URL',
      type: 'url',
      initialValue: 'https://linkedin.com/in/mayank-sahu-ou',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume Document URL',
      type: 'string',
    }),
  ],
})
