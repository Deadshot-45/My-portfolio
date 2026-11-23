export const SANITY_PROJECTS_QUERY = `
  *[_type == "project" && !(_id in path("drafts.**"))] | order(displayOrder asc, _createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    clientName,
    category,
    categoryLabel,
    shortDescription,
    description,
    technologies,
    duration,
    liveUrl,
    githubUrl,
    featured,
    coverImage,
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
    title,
    subtitle,
    description,
    deliverables,
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
    description,
    websiteUrl,
    logo,
    displayOrder
  }
`;

export const SANITY_EXPERIENCE_QUERY = `
  *[_type == "experience" && !(_id in path("drafts.**"))] | order(startDate desc) {
    _id,
    title,
    company,
    employmentType,
    location,
    startDate,
    endDate,
    current,
    description,
    highlights,
    technologies,
    displayOrder
  }
`;
