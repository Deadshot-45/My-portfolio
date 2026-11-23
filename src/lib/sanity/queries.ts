export const SANITY_PROJECTS_QUERY = `
  *[_type == "project" && !(_id in path("drafts.**"))] | order(displayOrder asc, _createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    clientName,
    location,
    year,
    category,
    categoryLabel,
    shortDescription,
    description,
    technologies,
    duration,
    liveUrl,
    githubUrl,
    accentColor,
    featured,
    coverImage,
    coverImageUrl,
    headline,
    badge,
    metrics,
    deliverables,
    displayOrder
  }
`;

export const SANITY_PROFILE_QUERY = `
  *[_type == "profile" && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    headline,
    bio,
    location,
    email,
    phone,
    avatar,
    resumeUrl,
    statusText,
    availableForWork,
    socialLinks
  }
`;

export const SANITY_SERVICES_QUERY = `
  *[_type == "service" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
    _id,
    number,
    title,
    subtitle,
    badge,
    description,
    tags,
    deliverables,
    techStack,
    icon,
    displayOrder
  }
`;

export const SANITY_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
    _id,
    clientName,
    company,
    clientDesignation,
    content,
    rating,
    avatar,
    displayOrder
  }
`;

export const SANITY_CLIENTS_QUERY = `
  *[_type == "client" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
    _id,
    name,
    city,
    country,
    category,
    description,
    websiteUrl,
    logo,
    displayOrder
  }
`;

export const SANITY_EXPERIENCE_QUERY = `
  *[_type == "experience" && !(_id in path("drafts.**"))] | order(displayOrder asc, startDate desc) {
    _id,
    title,
    company,
    employmentType,
    location,
    period,
    startDate,
    endDate,
    current,
    description,
    highlights,
    technologies,
    displayOrder
  }
`;

export const SANITY_SKILLS_QUERY = `
  *[_type == "skill" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
    _id,
    category,
    skills,
    displayOrder
  }
`;

export const SANITY_SEO_QUERY = `
  *[_type == "seoSettings" && !(_id in path("drafts.**"))][0] {
    _id,
    metaTitle,
    metaDescription,
    keywords,
    canonicalUrl,
    ogImage,
    ogImageUrl,
    twitterHandle,
    robotsIndex
  }
`;

export const SANITY_SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    _id,
    siteName,
    tagline,
    primaryEmail,
    phone,
    location,
    availableForWork,
    availabilityText,
    defaultSkyMode,
    githubUrl,
    linkedinUrl,
    resumeUrl
  }
`;
