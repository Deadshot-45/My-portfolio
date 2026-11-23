import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { profileType } from './profile'
import { serviceType } from './service'
import { testimonialType } from './testimonial'
import { clientType } from './client'
import { experienceType } from './experience'
import { skillType } from './skill'
import { seoSettingsType } from './seo'
import { siteSettingsType } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  projectType,
  serviceType,
  testimonialType,
  clientType,
  profileType,
  skillType,
  experienceType,
  seoSettingsType,
  siteSettingsType,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
