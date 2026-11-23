import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('client').title('Clients'),
      S.documentTypeListItem('profile').title('About Me'),
      S.documentTypeListItem('skill').title('Skills & Tech'),
      S.documentTypeListItem('experience').title('Experience'),
      S.divider(),
      S.documentTypeListItem('seoSettings').title('SEO Settings'),
      S.documentTypeListItem('siteSettings').title('Website Settings'),
    ])
