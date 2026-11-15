# Harsh Gour — Luxury AI/ML Portfolio

## Implementation

Build a single-page React + TypeScript portfolio served by Vite on the managed web runtime. Use a small, reusable component system instead of a monolithic page: `App` owns section composition and app state; `data/site.ts` centralizes authentic personal, social, skill, project, education and achievement data; `components/layout` owns the sticky navigation and footer; `components/sections` owns each content section; `components/ui` contains buttons, badges, section headers, modals and field primitives; `components/three` owns the hero canvas; `styles` contains the design tokens and responsive CSS. Use Framer Motion for entrance/reveal choreography and Lucide React for recognizable interface/social icons. Use Three.js directly in a small hero scene so the initial bundle stays understandable and mobile fallbacks are easy to control.

The public route set is one indexable page at `/`; navigation is hash-based and the clickable HG. wordmark resolves to `/#home`. The route manifest will declare `/` only. All social URLs are centralized and rendered with `target="_blank"` and `rel="noopener noreferrer"`. Project repository/demo controls are data-driven and omitted when no verified URL is known. The project-detail interaction is an accessible modal with focus return and Escape handling, not an invented route.

The contact form performs client-side validation and submits to `/api/contact` only when `CONTACT_ENDPOINT` is configured at runtime. The UI will never claim success without a successful response. If no endpoint is configured it shows a clear configuration message with an email-free fallback instruction, and `.env.example` plus `CONTACT_SETUP.md` document the required backend contract. The server will expose a small JSON endpoint that returns a transparent 501 until a real delivery provider is configured, avoiding fake submissions.

Use Vite's build output in `dist`, include a production start command that listens on `0.0.0.0` and honors `PORT`, and add a Dockerfile for container publication because the project has the managed server capability. Keep deployment configuration ready without publishing automatically. Include `public/manus-routes.json`, `public/favicon.svg`, `public/robots.txt`, and `public/sitemap.xml` only where a configured public origin is available; omit guessed canonical URLs from metadata until an origin is configured.

## Design direction

Three candidate directions were considered: (0.06) editorial observatory with measured typographic pacing; (0.04) gallery-like brass instrument with sparse spatial compositions; (0.08) luxury technology atelier with cinematic black surfaces and controlled metallic highlights. Choose **luxury technology atelier**.

**Design movement:** cinematic luxury technology editorial: an art-directed portfolio that treats code as a crafted material rather than a dashboard.

**Core principles:** deep contrast with quiet surfaces; intentional asymmetry and vertical rhythm; gold used as a scarce signal rather than a wash; every interaction should explain hierarchy or affordance.

**Color philosophy:** obsidian black creates a calm, gallery-like field; graphite surfaces give the eye somewhere to rest; metallic gold marks active decisions and important moments; champagne softens the contrast so the site feels warm, human and premium instead of neon or cold.

**Layout paradigm:** a scroll-led sequence of wide editorial bands with a left-side section index, offset content columns and occasional full-bleed visual breathing room. Avoid generic centered grids; use asymmetric splits and cards with deliberate negative space.

**Signature elements:** a thin gold orbital line system around the hero sculpture; micro-labels with section numbers and warm tracking; brushed-metal buttons and rules that catch a restrained highlight on hover.

**Interaction philosophy:** motion is tactile and directional. Hover reveals should feel like light passing across a surface, not a glow. Buttons have small magnetic lift; project cards tilt only on pointer-capable devices; keyboard and reduced-motion paths remain first-class.

**Animation:** hero copy enters in a quiet stagger; the sculpture rotates slowly with pointer parallax; sections reveal through opacity and short vertical travel; metallic shine uses a clipped gradient sweep; mobile replaces dense 3D with a lighter canvas and no forced pointer tracking; `prefers-reduced-motion` removes transforms and continuous particle motion.

**Typography system:** use a high-contrast serif display face for hero and section titles paired with a clean grotesk sans for navigation, metadata and body copy. Set editorial titles with tight leading and restrained champagne italics; keep body copy at accessible line lengths and use uppercase tracking only for micro-labels.

**Brand essence:** a premium personal studio for an aspiring AI/ML engineer who turns curiosity into tangible software — considered, technical, warm. Personality: precise, curious, quietly ambitious.

**Brand voice:** direct, thoughtful and craft-focused. Example lines: “Building intelligent experiences at the intersection of AI & code.” and “Learn something. Make something. Learn again.”

**Wordmark & logo:** a compact `HG.` monogram in a framed gold hairline, paired with a spaced `HARSH GOUR` wordmark; the period is a small champagne disc that becomes the shine anchor on hover.

**Signature brand color:** `#C9A45C` Metallic Gold.

## Project structure

```text
src/
  main.tsx                 # React entry and global styles
  App.tsx                  # section composition, nav state, modal state
  data/site.ts             # centralized authentic portfolio content
  components/
    layout/Navigation.tsx  # sticky glass nav and mobile menu
    layout/Footer.tsx      # footer and back-to-top
    sections/              # Hero, About, Skills, Projects, Education, Achievements, Contact
    ui/                    # Button, SectionHeader, ProjectModal, SkillCard, SocialLinks
    three/HeroScene.tsx    # optimized metallic sculpture and particles
  styles/globals.css       # tokens, layout, type, responsive states
public/
  favicon.svg
  manus-routes.json
  robots.txt
  sitemap.xml
server.mjs                # static server and contact endpoint contract
index.html                # crawler-visible metadata and app mount
Dockerfile                # production container
.env.example              # contact endpoint configuration
CONTACT_SETUP.md          # real submission contract and deployment notes
TODO.md
plan.md
```
