# Civic Bangladesh — Design Rules

This file is the **visual source of truth** for every page. All UI work must follow these rules. Do not introduce colors, fonts, spacing, or radii outside of what's defined here without updating this file first.

The **existing homepage is the visual source of truth**. Do not redesign, replace, restructure, or visually alter it unless explicitly requested.

Do **not** create a separate visual identity for internal pages. Every new page must feel like it belongs to the same website: same color system, typography, spacing, buttons, cards, borders, icons, and motion.

Civic Bangladesh must stay visually independent from the official government portal unless official branding is provided.

## Product Feel

The product should feel:

- Government-trustworthy
- Modern
- Premium
- Educational
- Human
- Practical
- Information-rich but not overwhelming
- Citizen-friendly
- Mobile-first

Also: spacious, accessible, Bangladesh-relevant, and professional. Civic education may be warmer and more narrative. Government service learning should feel calmer, more structured, and easier to scan. Neither side may invent a second brand.

## Visual Relationship

Civic education content can use more emotional storytelling: photography, human moments, and narrative section rhythm (as already used on the homepage).

Government service learning should use a more structured, trustworthy, information-oriented visual style: clear hierarchy, scannable facts, and progressive disclosure.

Both must still use the exact same:

- color system
- typography
- spacing
- button system
- card language
- border system
- icon system
- motion system

Layout density may differ. Tokens, components, and brand language may not.

## Color

| Token          | Hex       | Usage                                                                     |
| -------------- | --------- | ------------------------------------------------------------------------- |
| Primary        | `#0B6B4F` | Primary brand color, main CTAs, key accents                               |
| Secondary      | `#147D64` | Secondary brand color, hover/gradient companion to primary                |
| Light Green    | `#EAF7F1` | Soft tinted backgrounds, badges, highlighted sections                     |
| Accent Red     | `#E53935` | Sparingly used accent tied to the Bangladesh flag; not a general UI color |
| Background     | `#F8FAF9` | Page background                                                           |
| Surface        | `#FFFFFF` | Cards, panels, modals, elevated surfaces                                  |
| Main Text      | `#17221E` | Primary text color                                                        |
| Secondary Text | `#66736D` | Muted/supporting text, captions, metadata                                 |
| Border         | `#DDE7E2` | Dividers, card borders, input borders                                     |
| Success        | `#1B8A5A` | Success states                                                            |
| Warning        | `#D88A16` | Warning states                                                            |
| Error          | `#D64545` | Error states, destructive actions                                         |

Do not add a government-portal palette, a second course brand, or extra accent colors for service pages.

## Typography

- **English typeface:** Inter
- **Bangla typeface:** Noto Sans Bengali

| Element         | Size    |
| --------------- | ------- |
| Hero (desktop)  | 56–72px |
| Hero (mobile)   | 36–42px |
| Section heading | 36–48px |
| Body            | 16–18px |
| Small UI text   | 14px    |
| Buttons         | 15–16px |

- **Bangla body line-height:** 1.7–1.9 (Bangla script needs more vertical breathing room than Latin text)

Service pages may use more small UI text for metadata (fees, time, documents). Do not shrink body copy below these sizes to fit extra information.

## Layout

- **Max content width:** 1440px
- **Section spacing (desktop):** 72–96px
- **Section spacing (tablet):** 56–72px
- **Section spacing (mobile):** 40–56px
- **Default card radius:** 16–18px
- **Button radius:** 12–14px

Design mobile-first. Internal pages use the same container, section padding, card radius, and button radius as the homepage.

## Buttons, Cards, Borders, Icons, Motion

Reuse the homepage language. Do not invent new button variants, card skins, or icon styles for services or courses.

- **Buttons:** primary green for the main action on a screen; outline/secondary for supporting actions. Official application uses a clearly labeled official-portal CTA (e.g. **Apply on Official Portal**) in the existing button system — not government-portal chrome.
- **Cards:** white surface, `16–18px` radius, light border, sparing shadow. Service facts, courses, documents, and certificates sit in this same card language.
- **Borders:** `#DDE7E2` only. Use borders and spacing for hierarchy before adding extra color or shadow.
- **Icons:** Lucide, current brand size and stroke. Do not mix icon families.
- **Motion:** short, standard easing; hover scale/shadow as on existing cards. No decorative animation, no gamified motion.

## Service UX Principle

Government service information can be complex. Do not dump it in one long page.

Therefore:

- use progressive disclosure
- use clear section hierarchy
- use tabs/accordions where appropriate
- use visual step indicators
- prioritize important information
- highlight required documents
- highlight government fee
- highlight processing time
- highlight application CTA
- highlight related course

Highlighting means placement, hierarchy, and existing tokens (primary, light green, warning for caution). It does not mean new colors or a dashboard-style widget kit.

Always attribute official service facts. Never invent fees, times, documents, or partnerships. Civic Bangladesh prepares the citizen; the application happens on the official portal.

## Course UX

Courses should feel like a premium EdTech experience, still inside this website.

Use:

- video-first layouts
- clear curriculum
- progress indicators
- short lessons
- assessment states
- certificate previews
- affordable pricing

Progress, assessment, and certificate UI must use the existing progress, badge, card, and button components. Certificates are previews of Civic Bangladesh learning credentials — never fabricated government certification.

## Avoid

- Redesigning the homepage, or making inner pages look like a different product
- Imitating official government portal branding or chrome
- Excessive glassmorphism
- Excessive gradients
- Excessive shadows
- Childish gamification
- Random colors outside the palette above
- Tiny typography
- Inconsistent card styles/radii
- Excessive rounded elements
- Unnecessary decoration
- Dense, unprioritized government-service dumps
- A second visual system for “serious” service pages versus “friendly” civic pages
