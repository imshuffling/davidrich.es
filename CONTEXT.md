# Domain Glossary

- **Site Config** (`utils/site.ts`) — single source of truth for site-wide facts: URL, brand strings, contact details, external links, nav links. Nothing hardcodes an email, resume URL or nav item outside this module.
- **Page Metadata** (`utils/metadata.ts`) — `buildMetadata()` owns the OpenGraph/Twitter scaffold every page shares; the JSON-LD builders (`personJsonLd`, `websiteJsonLd`, `articleJsonLd`, `breadcrumbJsonLd`) own the structured-data story.
- **Image Intent** (`utils/contentfulImage.ts`) — server-side transform preset (`hero`, `card`, `og`, `poster`) applied to a Contentful image URL before it crosses to the client, alongside blurhash enrichment.
- **Image Variant** (`components/ImageWrapper.tsx`) — rendering preset (`card`, `hero`, `twoColumn`) that owns `sizes`, fill mode and quality. Callers pick a variant; they never pass raw `next/image` props.
- **Block** (`blocks/`, `types/contentful.ts`) — a discriminated-union Contentful content section (`TextLeft`, `TextArea`, `Image`, `Video`, `TwoColumn`) dispatched by `blocks/index.tsx`.
- **Icon Palette** (`utils/visuals.ts`) — the shared `{bg, color}` tuples; `colorFor(key)` deterministically assigns one per title via `stableIndex`.
