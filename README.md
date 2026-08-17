# Civic Bangladesh

**সিভিক বাংলাদেশ** — Better Citizens. Better Bangladesh.  
সচেতন নাগরিক, সুন্দর বাংলাদেশ।

A civic-education and government-service **learning** platform for Bangladesh. It helps people build everyday civic habits and prepare to use government services correctly.

Civic Bangladesh is **not** the official government application portal. It does **not** process applications, collect government fees, or issue government certificates.

Official applications go to the national portal: [bangladesh.gov.bd](https://www.bangladesh.gov.bd).

## Two equal pillars

1. **Civic education** — everyday habits: roads, cleanliness, public space, transport, digital citizenship, community. Core civic learning stays free.
2. **Government service learning** — find a sample service, learn the papers and process, take a short preparation course, then apply on the official portal.

Learning path for services:

**Find a service → Learn the process → Watch the course → Assessment → Civic Bangladesh learning credential → Apply on the official portal**

Certificates on this site are **Civic Bangladesh learning credentials**, not government certification.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Redux Toolkit
- Bangla / English (`bn` is the default locale)

No backend. No Next.js Server Actions. Catalog data is **sample / demo** — not official government records.

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
bun run build
bun run start
bun run lint
```

`npm`, `yarn`, or `pnpm` also work if you prefer.

## Main routes

| Path                                 | What it is                          |
| ------------------------------------ | ----------------------------------- |
| `/`                                  | Homepage                            |
| `/civic-learning`                    | Civic education hub                 |
| `/services`                          | Government service catalog (sample) |
| `/services/[slug]`                   | Service guide                       |
| `/courses`                           | Course catalog                      |
| `/courses/[slug]`                    | Course detail                       |
| `/courses/[slug]/learn`              | Video player                        |
| `/certificates`                      | Learning credentials                |
| `/challenges`                        | Civic + learning challenges         |
| `/pricing`                           | Course pricing (no live payment)    |
| `/campaigns`                         | Civic campaigns (sample)            |
| `/stories`                           | Teaching stories (sample)           |
| `/community`                         | Participation hub (no live feed)    |
| `/civic-promise`                     | Visit-only civic promise            |
| `/videos`                            | Short civic clips (sample)          |
| `/about`                             | Product positioning                 |
| `/faq` `/help`                       | Support                             |
| `/accessibility` `/privacy` `/terms` | Policy pages                        |
| `/schools` `/organizations`          | Institutional programs              |
| `/profile`                           | Learner dashboard                   |
| `/dashboard/services`                | Service-learning dashboard          |

Not built yet: `/resources`, `/login`, `/quiz`.

## Project layout

```
app/           Next.js routes
components/    UI by domain (civic, learning, services, layout, …)
data/          Sample catalog (courses, services, challenges, …)
locales/       en/ and bn/ translation dictionaries
lib/           Helpers (copy lookup, search, views)
constants/     Routes and nav
public/        Images
```

Copy lives in `locales/`. English files define the key shape; Bangla files must match. Do not hardcode UI strings in components.

## Product rules

- Never invent government fees, processing times, partnerships, or official status.
- Never claim Civic Bangladesh is a government office.
- Label sample data as sample.
- Course fees are Civic Bangladesh fees, not government fees.
- Enrolment checkout is a **preview** — no real payment processing.
- Apply CTA: **Apply on Official Portal** → `https://www.bangladesh.gov.bd`

## Source of truth

| File                                         | Use                                                   |
| -------------------------------------------- | ----------------------------------------------------- |
| [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) | Product decisions                                     |
| [`DESIGN_RULES.md`](./DESIGN_RULES.md)       | Visual system (primary `#0B6B4F`, max content 1440px) |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md)       | Folder structure                                      |

The homepage is approved. Do not redesign it unless asked.
