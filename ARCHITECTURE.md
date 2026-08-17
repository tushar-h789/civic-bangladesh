# Civic Bangladesh — Frontend Architecture

Structural source of truth. Folders are scaffolded now; dependencies (shadcn/ui, Redux Toolkit, RTK Query) and actual pages/components/logic are added in later steps.

## Top-Level Structure

```
app/           # Next.js App Router routes, layouts, route-level UI
components/    # All reusable React components, organized by domain
redux/         # Redux Toolkit store, provider, slices, RTK Query services
hooks/         # Shared custom React hooks
lib/           # Framework-agnostic helpers/utilities (e.g. cn(), formatters)
types/         # Shared TypeScript types/interfaces
constants/     # Static enums, config values, route paths, labels
data/          # Static/mock/demo data (explicitly sample data, not real gov data)
locales/       # Centralized Bangla/English translation dictionaries
public/        # Static assets (images, icons, fonts if self-hosted)
```

## `components/` — organized by domain

| Folder       | Purpose                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `ui/`        | Low-level primitives (shadcn/ui components live here)                                               |
| `common/`    | Generic reusable pieces not tied to one domain (buttons, cards, badges, etc. built on top of `ui/`) |
| `layout/`    | Structural chrome: navbar, footer, page shells, containers                                          |
| `civic/`     | Civic-awareness content components (rights & duties, civic facts, etc.)                             |
| `learning/`  | Civic-learning/course-related components                                                            |
| `quiz/`      | Quiz UI and quiz-flow components                                                                    |
| `challenge/` | Civic challenge/practice components                                                                 |
| `campaign/`  | Campaign listing/detail components                                                                  |
| `community/` | Community/participation features                                                                    |
| `dashboard/` | User-facing dashboard components                                                                    |
| `admin/`     | Admin/institutional-program components                                                              |

Rule: a component only goes in a domain folder if it's specific to that domain. Anything reusable across 2+ domains belongs in `common/` or `ui/`.

## `redux/` structure

| Folder      | Purpose                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| `store/`    | Store configuration (`configureStore`, root reducer, typed `RootState`/`AppDispatch`)                      |
| `provider/` | Client component wrapping `<Provider>` for use in `app/layout.tsx`                                         |
| `slices/`   | Redux Toolkit slices (client-side UI/app state)                                                            |
| `services/` | RTK Query API service definitions (client-side API integration only — no Server Actions, no backend logic) |

## `locales/` structure

```
locales/
  types.ts       # Locale union type, DEFAULT_LOCALE, LOCALE_LABELS, isLocale()
  en/             # English strings — source of truth for shape/keys
    common.ts
    accessibility.ts
    index.ts      # combines namespaces into the `Dictionary` type
  bn/             # Bangla strings — each namespace typed against its
                  # English counterpart, so a missing/renamed key is a
                  # compile error, not a silent runtime fallback
    common.ts
    accessibility.ts
    index.ts
  index.ts        # public barrel: en, bn, Dictionary, Locale, LOCALES, ...
```

Rule: add one namespace file per feature/domain (mirroring `components/`'s domain split, e.g. a future `civic.ts`, `learning.ts`) in both `en/` and `bn/`, then register it in each locale's `index.ts`. Never hardcode UI copy directly in components — read it from `useTranslation()` (see `hooks/use-translation.ts`) instead.

## Notes

- Architecture is intentionally flat and domain-driven rather than deeply nested — favors simplicity over premature abstraction.
- No pages, components, or Redux logic have been implemented yet — this prompt only establishes the folder skeleton (each empty folder currently holds a `.gitkeep` placeholder so it's tracked in git).
- See `PROJECT_CONTEXT.md` for product decisions and `DESIGN_RULES.md` for visual rules.
