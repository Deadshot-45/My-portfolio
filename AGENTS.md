## Repository-Wide Agent Instructions: Modularity & Task Breakdown Update

We have updated our core operational guidelines to emphasize clean component modularity and rigorous task decomposition:

1. Component Modularity & File Size Limits
Single Responsibility & Size: Keep components focused and manageable. Avoid monolithic files by breaking down large components into smaller, single-purpose sub-components or helper modules when a file grows beyond easily readable limits.

Maintainability: Ensure clear boundaries between data fetching, business logic, and presentation layers without introducing unnecessary premature abstractions.

2. Incremental Task Breakdown
Small, Atomic Steps: Break complex or broad development tasks into small, sequential, verifiable parts.

Focused Verification: Implement and verify each small part independently before proceeding to the next increment, ensuring higher correctness and simpler debugging.

Completed:
Reviewed and integrated the component splitting and task breakdown instructions into our repository operating standards.

Skipped / Not Checked:
No code changes, file edits, or test suites were executed for this configuration update.

Structural Risks:
None currently identified.

1. Mission
Build and maintain Mayank's portfolio website and its content management
system with the smallest correct implementation.

The governing principle is:
The best code is the code you never wrote.

Prioritize correctness, maintainability, accessibility, security,
performance, and consistency with the existing repository over adding
abstractions or dependencies.

This file defines how coding agents must operate in this repository.
DESIGN.md defines the product experience, visual direction, public
pages, CMS capabilities, and quality expectations. Read both before
making substantial implementation changes.
2. Mandatory First Steps
Before editing code:
1. Inspect the repository root and identify the actual application
   structure.
2. Read package.json, the lockfile, Next.js configuration, TypeScript
   configuration, Tailwind configuration, and relevant project
   documentation.
3. Inspect the existing routing approach (App Router or Pages Router)
   and follow it.
4. Inspect existing UI components, shadcn/ui setup, theme tokens,
   utility functions, hooks, API clients, data models, and test
   infrastructure.
5. Trace the data flow for the requested feature from its source
   through validation and server/data access to the rendered UI.
6. Search for existing implementations before creating new components,
   hooks, utilities, API routes, schemas, or abstractions.
7. Read the relevant source files in full enough context to understand
   their behavior and dependencies.
8. Inspect the current Git status and existing user changes before
   editing. Never overwrite or discard unrelated user work.
Do not assume the repository structure, framework version, installed
dependencies, database, CMS provider, or deployment architecture.

Do not create a new project structure or move files simply because
another structure is more familiar.
Existing CLIENT_MARKS export error
A reported Next.js export error references CLIENT_MARKS in
src/data/portfolioData.ts.

If this issue is in scope, investigate before editing:
- Read src/data/portfolioData.ts.
- Search all definitions, exports, imports, and references to
  CLIENT_MARKS.
- Inspect barrel files, aliases, path casing, and relevant build
  configuration.
- Check for circular imports or incorrect import/export syntax.
- Determine the actual root cause.
- Apply the smallest safe correction.
- Preserve real portfolio content.
- Add a focused test or type-level verification when appropriate.
- Run the narrowest relevant check and report its actual result.
Do not silence the error by inventing placeholder client data,
duplicating exports, or broadly changing unrelated files.
3. Ponytail Decision Ladder
Before implementing any feature, bug fix, or refactor, ask these
questions in order:
1. Does this feature need to exist?
2. Is it already implemented elsewhere in this repository?
3. Can the language standard library solve it?
4. Can a native browser or platform API solve it?
5. Can an already-installed dependency solve it?
6. Can the requirement be expressed cleanly with a small amount of
   code?
7. Only if all previous options fail, write the minimum code that
   correctly solves it.
Do not skip the investigation because a new package or abstraction
appears convenient.

Be economical with implementation, not with reading, testing, or safety.
4. Source-of-Truth and Architecture Rules
- Follow the existing repository architecture unless there is a
  demonstrated reason to change it.
- Keep one source of truth for each piece of data.
- Reuse existing types, schemas, API clients, hooks, components, and
  utilities.
- Avoid duplicate business logic between client and server.
- Keep data validation and authorization at the server trust boundary.
- Keep secrets and privileged operations server-side.
- Use explicit types; avoid any unless a documented compatibility
  constraint makes it necessary.
- Avoid premature abstractions and generic frameworks for one-off
  requirements.
- Keep components focused, but do not split code into many tiny files
  without a real benefit.
- Preserve existing public interfaces and data contracts unless the
  task requires a deliberate change.
- Avoid unrelated refactors, formatting churn, and renaming.
- Do not add compatibility layers for hypothetical future
  requirements.
- Do not add a second state, form, validation, animation, or
  data-fetching library when the existing stack is sufficient.
Next.js
- Follow the installed Next.js version and the repository's current
  routing architecture.
- Prefer Server Components for server-rendered content and
  non-interactive UI where supported.
- Use Client Components only for actual client-side interactivity,
  browser APIs, or client state.
- Keep client boundaries as small as practical.
- Do not add "use client" to a whole page or layout when only a
  child needs it.
- Keep secrets, database access, privileged SDKs, and server-only
  modules out of client bundles.
- Use the existing Next.js metadata, image, font, navigation, and
  caching features appropriately.
- Avoid unnecessary client-side fetching for content that can be
  safely fetched on the server.
- Prevent hydration mismatches when rendering dates, local time,
  random values, browser state, or theme-dependent content.
- Use the existing error, loading, and not-found conventions.
- Do not assume that a caching or revalidation API behaves identically
  across Next.js versions; verify against the installed version.
TypeScript
- Preserve strict typing.
- Prefer existing domain types and inferred schema types.
- Avoid unsafe casts and non-null assertions when a proper guard is
  possible.
- Validate external data before treating it as an internal domain
  type.
- Keep API request and response contracts explicit.
- Do not suppress TypeScript errors with @ts-ignore to make a build
  pass. If suppression is unavoidable, explain the reason and scope it
  narrowly.
5. UI, Tailwind CSS, and shadcn/ui
- Inspect the existing theme and component conventions before creating
  UI.
- Use the installed shadcn/ui components for suitable primitives such
  as dialogs, dropdowns, selects, tabs, forms, and menus.
- Reuse existing project components before creating duplicates.
- Use semantic design tokens such as bg-background,
  text-foreground, border-border, bg-card,
  text-muted-foreground, and existing primary/secondary tokens where
  available.
- Do not scatter hardcoded colors through components.
- Do not introduce a second styling system.
- Keep responsive behavior intentional and verify narrow viewports.
- Prefer semantic HTML over custom interactive elements.
- Use buttons for actions and links for navigation.
- Provide visible focus states and accessible labels.
- Do not use hover as the only way to reveal essential information.
- Do not make controls decorative or inert when they appear
  interactive.
- Avoid unnecessary wrappers, nested cards, and excessive rounded
  containers.
- Keep empty, loading, disabled, success, and error states consistent
  with the existing design system.
Theme support
- Preserve both dark and light themes.
- Use the current theme provider and token configuration.
- Avoid direct DOM theme manipulation if the existing theme system
  already handles it.
- Prevent theme flashes where supported by the current setup.
- Check text, icons, borders, images, focus rings, and form controls
  in both themes.
- Respect the user's saved preference and system preference according
  to the existing theme behavior.
6. Animation and WebGL
Use motion only when it improves comprehension, feedback, or visual
storytelling.

Before implementing an animation: use gsap skills for animation.
1. Check whether a CSS transition or keyframe is sufficient.
2. Check existing animation utilities and installed packages.
3. Use GSAP or Framer Motion only when their capabilities are genuinely
   needed.
4. Do not use both libraries for the same simple interaction.
5. Do not install another animation dependency without a clear
   technical justification.
Required safeguards
- Respect prefers-reduced-motion.
- Do not hide essential content until an animation completes.
- Avoid scroll hijacking and forced scrolling.
- Avoid excessive parallax, cursor-following effects, and continuous
  animation.
- Clean up timelines, observers, event listeners, and animation
  contexts.
- Ensure animation does not break keyboard or touch interaction.
- Dynamically load expensive scenes where appropriate.
- Provide a static or CSS-based fallback for WebGL.
- Avoid rendering heavy 3D scenes when they are offscreen or
  unnecessary.
- Test on mobile and lower-powered devices.
- Do not make WebGL the only way to understand or use a section.
7. CMS and Content Management Rules
The CMS must let Mayank manage portfolio content without routine
source-code edits.

Before building CMS functionality, inspect the current repository for an
existing CMS, database, authentication flow, API layer, media storage,
and content models. Extend what exists when appropriate.
Content types
The intended manageable content includes:
- Homepage and hero content.
- Projects and project galleries.
- Services.
- Testimonials.
- Client brands and logos.
- About content.
- Contact details and social links.
- SEO and site settings.
- Media assets.
Use structured content models rather than an unrestricted page builder
unless the product requirements explicitly change.
Content integrity
- Use a single source of truth for each content type.
- Validate content on the server.
- Enforce unique slugs.
- Validate external URLs.
- Preserve publication status and display order.
- Track creation and update timestamps where supported.
- Maintain referential integrity for related records.
- Do not silently reset, overwrite, or delete existing content.
- Use safe migration practices and inspect migration impact before
  applying changes.
- Never seed fabricated testimonials, client relationships, project
  outcomes, or performance metrics.
- Treat supplied project names and client names as unverified until
  confirmed.
- Publish logos, quotes, screenshots, and brand assets only when
  publication permission is established.
Draft and published content
- Public queries must return only published and approved content.
- Draft content must not leak through public API responses, page
  source, metadata, search, sitemap, or static output.
- Protect preview routes and preview data.
- Publishing, unpublishing, updating, or deleting content must trigger
  the appropriate cache revalidation or invalidation.
- Verify cache behavior against the installed Next.js version and
  current data-fetching architecture.
- Handle missing, unpublished, and deleted project slugs
  intentionally.
Admin security
- Protect admin pages and every mutation endpoint on the server.
- Client-side route guards are not authorization.
- Validate and authorize every mutation.
- Use the existing authentication system when suitable.
- Protect cookie-based sessions appropriately, including CSRF defenses
  where required.
- Apply rate limits to sign-in and sensitive endpoints.
- Never expose secrets, private tokens, or privileged service
  credentials to browser code.
- Do not log passwords, session tokens, or sensitive form content.
- Confirm destructive actions.
- Preserve recovery and data-loss handling.
- Do not weaken security to make an admin workflow easier.
Media uploads
- Validate file type, size, and content on the server.
- Do not trust browser-provided MIME types or filenames.
- Prevent uploaded files from being executed as application code.
- Treat SVG uploads as untrusted; sanitize or disallow them according
  to the existing storage pipeline.
- Use safe storage paths and generated identifiers where appropriate.
- Preserve assets referenced by published content.
- Do not automatically delete shared media without checking
  references.
- Provide upload progress and failure feedback when supported.
8. API, Data Fetching, and Caching
- Reuse the existing API client and data-fetching conventions.
- Avoid duplicate requests and unnecessary waterfalls.
- Fetch only the fields needed by the UI.
- Keep response shapes consistent with existing contracts.
- Validate untrusted request data at the server boundary.
- Enforce authorization before returning protected data or performing
  mutations.
- Use pagination for collections that can grow.
- Handle empty results and failures explicitly.
- Avoid returning secrets or internal-only fields.
- Use caching only where correctness permits it.
- Define cache invalidation for every CMS mutation that affects public
  content.
- Do not cache private or user-specific data in a shared public cache.
- Avoid adding a caching library when the framework or existing
  infrastructure already provides the required behavior.
- Do not introduce speculative caching that risks stale published
  content.
9. Forms and Validation
- Reuse the existing form and schema-validation libraries.
- Validate on both client and server where appropriate.
- Server validation is authoritative.
- Associate field errors with their inputs.
- Provide accessible success, pending, and failure feedback.
- Prevent duplicate submissions.
- Preserve user-entered values after recoverable failures.
- Do not silently discard form data.
- Do not collect unnecessary personal information.
- Protect contact endpoints against spam and abuse using an
  appropriate server-side strategy.
- Never expose email-provider credentials or private API keys in
  client code.
10. Accessibility
Accessibility is a non-negotiable requirement, not a finishing touch.
- Use semantic landmarks and logical heading order.
- Provide one clear page-level H1.
- Make all interactive elements keyboard operable.
- Maintain visible focus indicators.
- Give icon-only buttons accessible names.
- Use correct labels and descriptions for form controls.
- Associate validation errors with their fields.
- Provide meaningful alt text for informative images.
- Use empty alt text or appropriate hiding for decorative images.
- Do not convey meaning through color alone.
- Do not require hover, motion, or pointer precision to access
  content.
- Respect reduced-motion preferences.
- Manage focus for dialogs, menus, and mobile navigation.
- Maintain sufficient contrast in both themes.
- Avoid autoplay audio and unexpected movement.
- Test critical flows with keyboard navigation.
11. Performance
- Measure before optimizing.
- Keep client JavaScript and third-party scripts minimal.
- Use Next.js image optimization where appropriate.
- Provide image dimensions or aspect ratios to prevent layout shift.
- Lazy-load non-critical below-the-fold media.
- Dynamically import heavy interactive scenes where useful.
- Avoid unnecessary dependencies and duplicated packages.
- Avoid rendering large lists without an appropriate strategy.
- Prevent avoidable hydration errors.
- Avoid unnecessary re-renders and repeated calculations, but do not
  add memoization without evidence or a clear need.
- Keep server-only code out of client bundles.
- Verify production-like behavior instead of relying only on
  development performance.
- Do not claim performance scores or improvements unless measured.
12. SEO and Metadata
- Use the existing Next.js metadata conventions.
- Provide meaningful titles and descriptions for public pages.
- Support project-specific metadata.
- Use canonical URLs where appropriate.
- Configure Open Graph and social sharing images.
- Include only published public pages in the sitemap.
- Keep admin and preview routes out of search indexing.
- Use structured data only when accurate and appropriate.
- Ensure project pages contain useful crawlable content.
- Do not publish invented client claims or project details in
  metadata.
13. Security and Privacy
Never weaken security, privacy, or data integrity for convenience.
- Validate all untrusted inputs at trust boundaries.
- Enforce authorization on the server.
- Escape or safely render user-managed content.
- Avoid unsafe HTML injection.
- Keep secrets in server-side environment variables.
- Do not commit .env files, credentials, tokens, or private keys.
- Avoid exposing internal errors or stack traces to public clients.
- Use secure cookie settings appropriate to the deployment.
- Apply CSRF protections where required by the authentication model.
- Use rate limiting for sensitive endpoints.
- Avoid logging sensitive data.
- Confirm destructive operations.
- Handle personal data according to the application's privacy
  requirements.
- Do not add analytics or tracking without a clear need and
  appropriate privacy handling.
14. Testing and Verification
Any code written that contains a branch, loop, parser, money handling,
or security logic must leave at least one small, high-leverage test.

Use the repository's existing test framework. Do not add a new testing
dependency when the current setup can cover the behavior.
Testing expectations
- Test the important success path and at least one meaningful failure
  or boundary case.
- Test validation and authorization behavior for protected operations.
- Test publication filtering so draft content cannot appear publicly.
- Test slug uniqueness and relevant content-model constraints.
- Test cache invalidation or revalidation behavior where practical.
- Test forms for pending, success, and failure states.
- Test interactive components for keyboard behavior when relevant.
- Test reduced-motion behavior for significant animation features.
- Test responsive layouts at representative viewport sizes.
- Run the narrowest relevant test first.
- Run type checking, linting, and build checks as appropriate to the
  change.
- Inspect the final diff.
Never claim a test, lint, type check, build, browser check, or
deployment was successful unless it was actually run and its result was
observed.

If a command cannot be run, state that explicitly and explain why if
known.
15. Dependency Management
Before installing or removing any package:
1. Inspect package.json.
2. Inspect the lockfile.
3. Search for existing functionality.
4. Check native browser and platform capabilities.
5. Confirm that an installed dependency cannot solve the requirement.
6. Explain why the new package is necessary.
Rules:
- Do not install duplicate animation libraries.
- Do not install duplicate icon libraries.
- Do not introduce a second form or validation stack.
- Do not add a state-management library for trivial local state.
- Do not add a CMS provider, ORM, database, storage provider, or WebGL
  engine without repository inspection and a clear requirement.
- Keep package versions compatible with the installed Next.js and
  React versions.
- Avoid unrelated dependency upgrades.
- Update the lockfile through the repository's package manager.
16. Code Changes and Git Discipline
- Inspect git status before editing.
- Preserve all pre-existing user changes.
- Keep the patch focused on the requested task.
- Avoid unrelated refactoring or formatting.
- Do not delete files based only on their names or apparent lack of
  use.
- Search imports, dynamic references, route usage, and runtime
  registration before removing code.
- Do not overwrite user-created files without understanding their
  contents.
- Inspect git diff after editing.
- Review for accidental changes, duplicate logic, dead code, missing
  error handling, and security regressions.
- Do not commit or push unless explicitly requested.
- Do not reset, clean, force-push, or discard user changes unless
  explicitly authorized.
Shortcut tracking
If a deliberate shortcut is taken to ship faster, leave a comment using
this exact format:
// shortcut: <reason and what to revisit later>
The comment must explain both why the shortcut was taken and what needs
to be revisited.

Do not use shortcut comments for normal implementation choices.
17. Working Method
For each task, follow this sequence:
1. Understand: Restate the requested outcome internally and
   identify the affected user flow.
2. Inspect: Read the relevant code, data flow, existing
   conventions, and current Git state.
3. Decide: Apply the Ponytail decision ladder and choose the
   smallest correct solution.
4. Plan: Identify the smallest set of files and tests needed.
5. Implement: Make focused changes while preserving existing
   contracts and safeguards.
6. Test: Add high-leverage tests for required logic and run
   relevant checks.
7. Review: Inspect the final diff and consider security,
   accessibility, performance, and data integrity.
8. Report: Explain what changed, what was verified, what was not
   checked, and any remaining risks.
For straightforward changes, do not produce a large planning document
before doing the work. For broad or risky changes, provide a concise
implementation plan before editing.

If essential information is missing, inspect the repository first. Ask a
question only when a real decision cannot be resolved from the codebase
or the user's requirements.
18. Definition of Done
A task is complete only when all applicable items are satisfied:
- [ ] The existing repository structure and relevant code were
  inspected.
- [ ] The real data flow was traced.
- [ ] Existing functionality and dependencies were reused where
  appropriate.
- [ ] The smallest correct implementation was applied.
- [ ] Security, validation, authorization, accessibility, and
  data-loss safeguards were preserved.
- [ ] Required high-leverage tests were added.
- [ ] Relevant tests and checks were actually run.
- [ ] The final Git diff was reviewed.
- [ ] No unrelated files or user changes were overwritten.
- [ ] Any deliberate shortcut has the required comment.
- [ ] Remaining limitations and risks are accurately reported.
19. Mandatory Response Format
Every implementation response must end with these three sections:

Completed:
Summarize the exact files or behavior changed and what was verified. Do
not claim more than was done.

Skipped / Not Checked:
List relevant files, flows, tests, commands, browsers, devices, or
integrations that were not inspected or run. If no code inspection or
edits occurred, say so explicitly.

Structural Risks:
State known architectural, data, security, accessibility, performance,
or deployment risks. If no risks were found during the limited work, say
"None currently identified" rather than claiming the entire system is
risk-free.

This closing summary is mandatory for every implementation update,
including small fixes.